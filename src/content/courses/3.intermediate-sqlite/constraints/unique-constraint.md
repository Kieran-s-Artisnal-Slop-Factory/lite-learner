---
title: "Preventing duplicates with UNIQUE"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT \"unique\" AS uq, origin FROM pragma_index_list('accounts') WHERE origin = 'u';"
  rows:
    - { uq: 1, origin: "u" }
---

A `UNIQUE` constraint guarantees no two rows share the same value in a column —
perfect for usernames, emails, or SKUs. A second insert with a duplicate value
is rejected.

```sql
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL UNIQUE
);
```

Behind the scenes SQLite enforces this with a **unique index**, which you can
see in `pragma_index_list` — its `origin` is `'u'` (from a `UNIQUE` constraint)
and its `unique` flag is `1`.

## Your task

Create the `accounts` table above, with `username` marked `NOT NULL UNIQUE`.

Run it and check your solution — a unique index should exist on the table.
