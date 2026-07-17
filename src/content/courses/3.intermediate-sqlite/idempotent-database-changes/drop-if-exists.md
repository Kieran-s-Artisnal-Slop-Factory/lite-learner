---
title: "Rebuilding a table with DROP TABLE IF EXISTS"
initial_sql: |
  CREATE TABLE cache (
    key TEXT,
    value TEXT
  );
  INSERT INTO cache (key, value) VALUES
    ('theme', 'dark'),
    ('lang', 'en');
desired_state:
  query: "SELECT name, type, pk FROM pragma_table_info('cache') ORDER BY cid;"
  rows:
    - { name: "id", type: "INTEGER", pk: 1 }
    - { name: "key", type: "TEXT", pk: 0 }
    - { name: "value", type: "TEXT", pk: 0 }
---

Sometimes you don't want to preserve a table — you want to rebuild it from
scratch, maybe because its shape changed. `DROP TABLE` removes it, but errors if
it isn't there. `DROP TABLE IF EXISTS` is the safe version, and pairing it with
a fresh `CREATE` gives you a re-runnable "reset this table" script:

```sql
DROP TABLE IF EXISTS cache;
CREATE TABLE cache (
  id INTEGER PRIMARY KEY,
  key TEXT,
  value TEXT
);
```

Because the drop always clears the old table first, this whole snippet is
idempotent — run it as often as you like and you always end with the same empty,
correctly-shaped table.

## Your task

The database has an old `cache` table (no primary key, with some rows in it).
Rebuild it with a proper schema — `id INTEGER PRIMARY KEY`, `key TEXT`,
`value TEXT` — using `DROP TABLE IF EXISTS` then `CREATE TABLE`.

Run it and check your solution — `cache` should have the new three-column shape.
