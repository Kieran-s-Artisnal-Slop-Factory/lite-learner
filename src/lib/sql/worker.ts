/**
 * SQLite WASM Web Worker. Owns a single in-memory database so a slow or
 * looping query never freezes the UI thread.
 *
 * In-memory only (no OPFS): OPFS needs SharedArrayBuffer and therefore
 * COOP/COEP headers, which many static hosts can't set. A fresh in-memory DB
 * per exercise keeps deployment host-agnostic.
 *
 * Protocol: the client posts `{ id, type, ...payload }` and the worker
 * replies `{ id, ok: true, result }` or `{ id, ok: false, error }`.
 */
import sqlite3InitModule, { type Database, type Sqlite3Static } from '@sqlite.org/sqlite-wasm';
import type { Row } from './comparator';
import type { SqlRequest, SqlResponse, TableData } from './protocol';

let sqlite3: Sqlite3Static | null = null;
let db: Database | null = null;

async function ensureDb(): Promise<Database> {
  if (!sqlite3) {
    // The published typings take no arguments, but the Emscripten loader
    // accepts print/printErr overrides — silence its console chatter.
    const init = sqlite3InitModule as unknown as (config?: {
      print?: (msg: string) => void;
      printErr?: (msg: string) => void;
    }) => Promise<Sqlite3Static>;
    sqlite3 = await init({ print: () => {}, printErr: () => {} });
  }
  if (!db) {
    db = new sqlite3.oo1.DB(':memory:');
  }
  return db;
}

/** Discard the current DB and start from a blank in-memory file. */
async function reset(): Promise<void> {
  if (db) {
    db.close();
    db = null;
  }
  await ensureDb();
}

/** Run one or more statements, collecting any result rows produced. */
async function exec(sql: string): Promise<Row[]> {
  const database = await ensureDb();
  const resultRows: Row[] = [];
  database.exec({ sql, rowMode: 'object', callback: (row) => void resultRows.push(row as Row) });
  return resultRows;
}

/**
 * Compile every statement in `sql` without executing any of them —
 * sqlite3_prepare_v3 across the whole string, finalizing each statement.
 * Throws (and the error bubbles to the client) on the first invalid one.
 */
async function validate(sql: string): Promise<void> {
  const database = await ensureDb();
  const s = sqlite3!;
  const { capi, wasm } = s;
  const scope = wasm.scopedAllocPush();
  try {
    // Two pointer slots: *ppStmt (out: compiled stmt), *pzTail (out: rest of SQL).
    const [pSql, sqlByteLen] = wasm.scopedAllocCString(sql, true) as unknown as [number, number];
    const [ppStmt, pzTail] = wasm.scopedAllocPtr(2) as unknown as [number, number];
    let pCurrent = pSql;
    const pEnd = pSql + sqlByteLen;
    while (pCurrent < pEnd) {
      const rc = capi.sqlite3_prepare_v3(
        database.pointer!,
        pCurrent,
        pEnd - pCurrent,
        0,
        ppStmt,
        pzTail
      );
      if (rc !== 0) {
        throw new Error(capi.sqlite3_errmsg(database.pointer!));
      }
      const pStmt = wasm.peekPtr(ppStmt);
      pCurrent = wasm.peekPtr(pzTail);
      if (pStmt) capi.sqlite3_finalize(pStmt);
      else break; // only whitespace/comments remained
    }
  } finally {
    wasm.scopedAllocPop(scope);
  }
}

/** Table names, alphabetical (the DB viewer opens the first one). */
async function listTables(): Promise<string[]> {
  const rows = await exec(
    "SELECT tbl_name FROM sqlite_master WHERE type='table' AND tbl_name NOT LIKE 'sqlite_%' ORDER BY name;"
  );
  return rows.map((r) => String(r['tbl_name']));
}

/** Column metadata + the first 50 rows of one table, for the DB viewer. */
async function tableData(name: string): Promise<TableData> {
  const database = await ensureDb();
  const columns: TableData['columns'] = [];
  database.exec({
    // Parameter binding doesn't work inside PRAGMA on all builds; quote by
    // doubling embedded quotes instead.
    sql: `PRAGMA table_info("${name.replaceAll('"', '""')}");`,
    rowMode: 'object',
    callback: (row: Row) => {
      columns.push({ name: String(row['name']), type: String(row['type']) });
    },
  });
  const rows: Row[] = [];
  database.exec({
    sql: `SELECT * FROM "${name.replaceAll('"', '""')}" LIMIT 50;`,
    rowMode: 'object',
    callback: (row) => void rows.push(row as Row),
  });
  return { name, columns, rows };
}

self.onmessage = async (event: MessageEvent<SqlRequest>) => {
  const msg = event.data;
  const reply = (response: SqlResponse) => self.postMessage(response);
  try {
    switch (msg.type) {
      case 'reset':
        await reset();
        reply({ id: msg.id, ok: true, result: undefined });
        break;
      case 'exec':
        reply({ id: msg.id, ok: true, result: await exec(msg.sql) });
        break;
      case 'validate':
        await validate(msg.sql);
        reply({ id: msg.id, ok: true, result: undefined });
        break;
      case 'listTables':
        reply({ id: msg.id, ok: true, result: await listTables() });
        break;
      case 'tableData':
        reply({ id: msg.id, ok: true, result: await tableData(msg.name) });
        break;
    }
  } catch (err) {
    reply({ id: msg.id, ok: false, error: err instanceof Error ? err.message : String(err) });
  }
};
