---
title: "A re-runnable schema with IF NOT EXISTS"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT COUNT(*) AS tables FROM sqlite_master WHERE type = 'table' AND name IN ('users', 'sessions');"
  rows:
    - { tables: 2 }
---

An app's schema setup runs every time the app starts — so it has to be
**idempotent**: running it once or a hundred times leaves the same result and
never errors. A plain `CREATE TABLE` fails the second time, because the table
already exists.

`CREATE TABLE IF NOT EXISTS` fixes that: it creates the table the first time and
quietly does nothing afterwards.

```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  email TEXT
);
```

## Your task

Write a setup script that ensures **two** tables exist, using `IF NOT EXISTS`
on both so the whole thing is safe to re-run:

1. `users` — `id INTEGER PRIMARY KEY`, `email TEXT`
2. `sessions` — `id INTEGER PRIMARY KEY`, `user_id INTEGER`

Prove it's idempotent by running your script **twice** with no error, then check
your solution.
