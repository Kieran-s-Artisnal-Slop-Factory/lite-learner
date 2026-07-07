<script lang="ts">
  /**
   * Phase 0 spike — throwaway page proving the risky pieces work together:
   * SQLite WASM in a worker, seed + user query + DB viewer, prepare()-based
   * validation, the coercion comparator, and CodeMirror 6 with SQL mode.
   */
  import { onDestroy, onMount } from 'svelte';
  import { EditorView, basicSetup } from 'codemirror';
  import { sql, SQLite } from '@codemirror/lang-sql';
  import { SqlClient, type DesiredState } from '../../lib/sql/client';
  import type { TableData } from '../../lib/sql/protocol';
  import Card from '../Card.svelte';

  // Hardcoded stand-ins for what an exercise would provide.
  const INITIAL_SQL = `CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER
);
INSERT INTO users (name, age) VALUES ('Alice', 30), ('Bob', 21);`;

  const DESIRED_STATE: DesiredState = {
    query: 'SELECT age FROM users ORDER BY age;',
    rows: [{ age: 21 }, { age: 30 }],
  };

  const DEFAULT_BUFFER = `-- Try: INSERT INTO users (name, age) VALUES ('Carol', 25);\nSELECT * FROM users ORDER BY id;`;

  let client: SqlClient | null = null;
  let editorHost: HTMLDivElement;
  let editor: EditorView | null = null;

  let status = $state('Booting SQLite worker…');
  let sqlError = $state<string | null>(null);
  let resultRows = $state<Record<string, unknown>[]>([]);
  let solved = $state<boolean | null>(null);

  let tables = $state<string[]>([]);
  let activeTable = $state<string | null>(null);
  let tableView = $state<TableData | null>(null);

  async function refreshViewer(preferred?: string | null) {
    if (!client) return;
    tables = await client.listTables();
    activeTable = preferred && tables.includes(preferred) ? preferred : (tables[0] ?? null);
    tableView = activeTable ? await client.tableData(activeTable) : null;
  }

  async function seed() {
    if (!client) return;
    status = 'Seeding fresh in-memory DB…';
    await client.reset();
    await client.exec(INITIAL_SQL);
    await refreshViewer();
    status = 'Ready';
  }

  async function runBuffer() {
    if (!client || !editor) return;
    sqlError = null;
    solved = null;
    try {
      resultRows = await client.exec(editor.state.doc.toString());
      await refreshViewer(activeTable);
    } catch (err) {
      sqlError = err instanceof Error ? err.message : String(err);
    }
  }

  /**
   * prepare()-only check, no execution. Note: because prepare resolves table
   * names against the CURRENT schema, a buffer that creates a table and then
   * selects from it fails validation until the create has actually run —
   * validation is per-statement-against-current-state, not a dry run.
   */
  async function validateBuffer() {
    if (!client || !editor) return;
    sqlError = null;
    solved = null;
    try {
      await client.validate(editor.state.doc.toString());
      status = 'Buffer is valid (all statements compiled)';
    } catch (err) {
      sqlError = err instanceof Error ? err.message : String(err);
    }
  }

  async function checkSolution() {
    if (!client) return;
    sqlError = null;
    try {
      solved = await client.checkSolution(DESIRED_STATE);
    } catch (err) {
      sqlError = err instanceof Error ? err.message : String(err);
    }
  }

  async function selectTable(name: string) {
    if (!client) return;
    activeTable = name;
    tableView = await client.tableData(name);
  }

  onMount(async () => {
    editor = new EditorView({
      doc: DEFAULT_BUFFER,
      extensions: [basicSetup, sql({ dialect: SQLite })],
      parent: editorHost,
    });
    client = new SqlClient();
    try {
      await seed();
    } catch (err) {
      status = 'Failed to boot: ' + (err instanceof Error ? err.message : String(err));
    }
  });

  onDestroy(() => {
    editor?.destroy();
    client?.destroy();
  });
</script>

<div class="page-header">
  <h1>Engine spike</h1>
  <span class="muted">{status}</span>
</div>

<Card title="SQL editor">
  <div class="editor" bind:this={editorHost}></div>
  <div class="row toolbar">
    <button class="btn btn-primary" onclick={runBuffer}>Run</button>
    <button class="btn" onclick={validateBuffer}>Validate</button>
    <button class="btn" onclick={checkSolution}>Check solution</button>
    <button class="btn btn-danger" onclick={seed}>Reset DB</button>
  </div>
  {#if sqlError}
    <p class="sql-error">SQLite error: {sqlError}</p>
  {/if}
  {#if solved !== null}
    <p class={solved ? 'solved' : 'unsolved'}>
      {solved ? '✓ Solution check passed' : '✗ Solution check failed'}
      <span class="muted">(expects ages 21, 30 in order — delete or add a user to flip it)</span>
    </p>
  {/if}
</Card>

{#if resultRows.length > 0}
  <Card title="Query results">
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            {#each Object.keys(resultRows[0]!) as col}
              <th>{col}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each resultRows as row}
            <tr>
              {#each Object.keys(resultRows[0]!) as col}
                <td>{row[col] === null ? 'NULL' : String(row[col])}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Card>
{/if}

<Card title="DB viewer">
  {#if tables.length === 0}
    <p class="muted">No tables in the database.</p>
  {:else}
    <div class="row tabs">
      {#each tables as table}
        <button
          class="btn btn-sm"
          class:btn-primary={table === activeTable}
          onclick={() => selectTable(table)}
        >
          {table}
        </button>
      {/each}
    </div>
    {#if tableView}
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              {#each tableView.columns as col}
                <th>{col.name} <span class="muted coltype">{col.type}</span></th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each tableView.rows as row}
              <tr>
                {#each tableView.columns as col}
                  <td>{row[col.name] === null ? 'NULL' : String(row[col.name])}</td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <p class="muted">First 50 rows.</p>
    {/if}
  {/if}
</Card>

<style>
  .editor {
    border: 1px solid var(--border-color);
    border-radius: var(--radius-2);
    overflow: hidden;
  }

  .editor :global(.cm-editor) {
    min-height: 10rem;
    font-size: var(--font-size-sm);
  }

  .toolbar {
    margin-top: var(--space-3);
    gap: var(--space-2);
  }

  .tabs {
    gap: var(--space-1);
    margin-bottom: var(--space-3);
    flex-wrap: wrap;
  }

  .sql-error {
    color: var(--color-danger);
    font-family: ui-monospace, monospace;
    font-size: var(--font-size-sm);
    margin-top: var(--space-3);
  }

  .solved {
    color: var(--color-success, green);
    margin-top: var(--space-3);
  }

  .unsolved {
    color: var(--color-danger);
    margin-top: var(--space-3);
  }

  .coltype {
    font-weight: 400;
    font-size: var(--font-size-sm);
  }
</style>
