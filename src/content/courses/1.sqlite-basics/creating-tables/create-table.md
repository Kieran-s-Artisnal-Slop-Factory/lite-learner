---
title: "Creating a table with CREATE TABLE"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT name, type, pk FROM pragma_table_info('users') ORDER BY cid;"
  rows:
    - { name: "id", type: "INTEGER", pk: 1 }
    - { name: "name", type: "TEXT", pk: 0 }
    - { name: "age", type: "INTEGER", pk: 0 }
---

Every SQLite database is a collection of **tables**, and you make one with
`CREATE TABLE`. A table has a name and a list of columns, each with a name and
a type:

```sql
CREATE TABLE pets (
  id INTEGER PRIMARY KEY,
  name TEXT,
  species TEXT
);
```

- `INTEGER PRIMARY KEY` makes the column the table's unique row identifier —
  SQLite will fill it in automatically if you don't.
- `TEXT` stores strings; `INTEGER` stores whole numbers.

## Your task

The database is empty. Create a table called `users` with exactly these
columns, in this order:

1. `id` — `INTEGER PRIMARY KEY`
2. `name` — `TEXT`
3. `age` — `INTEGER`

Run your statement, then check your solution. Use the database viewer below
the editor to confirm the table looks right.
