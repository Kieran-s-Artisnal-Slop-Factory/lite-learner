---
title: "Journal modes and the WAL"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT mode FROM answer;"
  rows:
    - { mode: "memory" }
---

To stay durable through a crash, SQLite keeps a **journal** that lets an
interrupted write be undone or replayed. The `journal_mode` PRAGMA controls how:

- **`DELETE`** (the classic default) — writes a rollback journal, then deletes it
  on commit.
- **`WAL`** (write-ahead log) — appends changes to a separate `-wal` file and
  folds them back into the main database later, during a **checkpoint**. Its big
  win is concurrency: in WAL mode **readers don't block the writer and the
  writer doesn't block readers**, so many connections can read while one writes.
- **`MEMORY`** — keeps the journal in RAM. Fast, but no crash protection.

WAL needs a real file on disk. This course's database lives entirely in memory
(there's no file), so it's fixed in `memory` mode — reading `journal_mode`
confirms it:

```sql
CREATE TABLE answer (mode TEXT);
INSERT INTO answer SELECT * FROM pragma_journal_mode();
```

(On a file-backed database you'd switch to WAL with
`PRAGMA journal_mode = WAL;`.)

## Your task

Capture this database's current journal mode into an `answer` table using the
two statements above.

Check your solution — an in-memory database reports `memory`.
