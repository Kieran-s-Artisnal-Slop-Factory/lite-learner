---
title: "Idempotent schemas with CREATE TABLE IF NOT EXISTS"
initial_sql: |
  CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title TEXT
  );
desired_state:
  query: "SELECT name, type, pk FROM pragma_table_info('authors') ORDER BY cid;"
  rows:
    - { name: "id", type: "INTEGER", pk: 1 }
    - { name: "name", type: "TEXT", pk: 0 }
---

Schema files are often run more than once — every time an app boots, for
example. But plain `CREATE TABLE` **fails** if the table already exists. Try
it: this database already has a `books` table, so run

```sql
CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT);
```

and watch it error. The fix is `IF NOT EXISTS`, which makes the statement a
no-op when the table is already there:

```sql
CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT);
```

A schema file where every statement is safe to re-run is called
**idempotent** — you can run it once or a hundred times and end up in the same
state.

## Your task

Write an idempotent schema file that ensures both tables exist:

1. `books` — `id` (`INTEGER PRIMARY KEY`), `title` (`TEXT`) — already exists,
   so this one *must* use `IF NOT EXISTS`
2. `authors` — `id` (`INTEGER PRIMARY KEY`), `name` (`TEXT`)

Use `IF NOT EXISTS` on both statements, and prove it's re-runnable by running
your buffer **twice** without errors before checking your solution.
