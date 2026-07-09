---
title: "WITHOUT ROWID tables"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT 1 AS ok FROM sqlite_master WHERE name = 'kv' AND sql LIKE '%WITHOUT ROWID%';"
  rows:
    - { ok: 1 }
---

By default every SQLite table has a hidden integer `rowid` that really stores the
row, with your primary key kept in a separate index that points at it — two
lookups for a primary-key search. A **`WITHOUT ROWID`** table drops the hidden
rowid and stores rows directly in a tree keyed by your primary key, so a
primary-key lookup goes straight to the row.

```sql
CREATE TABLE kv (
  k TEXT PRIMARY KEY,
  v TEXT
) WITHOUT ROWID;
```

It's a good fit when the table has a natural (often non-integer) primary key you
look up by — like a key/value store or a join table — especially with short rows.
It requires an explicit `PRIMARY KEY`.

## Your task

Create a key/value table `kv` with `k TEXT PRIMARY KEY` and `v TEXT`, declared
`WITHOUT ROWID`:

```sql
CREATE TABLE kv (
  k TEXT PRIMARY KEY,
  v TEXT
) WITHOUT ROWID;
```

Check your solution — the check confirms `kv` is defined `WITHOUT ROWID`.
