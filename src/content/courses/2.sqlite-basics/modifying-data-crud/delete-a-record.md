---
title: "Removing rows with DELETE"
initial_sql: |
  CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER
  );
  INSERT INTO users (name, age) VALUES
    ('Alice', 30),
    ('Bob', 21),
    ('Carol', 17),
    ('Dave', 45);
desired_state:
  query: "SELECT name FROM users ORDER BY name;"
  rows:
    - { name: "Alice" }
    - { name: "Bob" }
    - { name: "Dave" }
---

`DELETE` removes rows. Like `UPDATE`, it takes a `WHERE` clause to choose which
ones — and the same warning applies, only sharper:

```sql
DELETE FROM users WHERE name = 'Carol';
```

> ⚠️ **`DELETE FROM users` with no `WHERE` empties the entire table.** There's
> no undo. Write the `WHERE` first, or even run it as a `SELECT` to preview the
> rows before swapping `SELECT *` for `DELETE`.

## Your task

Carol asked to have her account removed. Delete **only Carol's** row:

```sql
DELETE FROM users WHERE name = 'Carol';
```

Run it and check your solution — Alice, Bob, and Dave should remain.
