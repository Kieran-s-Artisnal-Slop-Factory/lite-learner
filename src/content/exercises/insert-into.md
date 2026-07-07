---
title: "Creating a row with INSERT INTO"
initial_sql: |
  CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER
  );
desired_state:
  query: "SELECT name, age FROM users ORDER BY name;"
  rows:
    - { name: "Alice", age: 30 }
    - { name: "Bob", age: 21 }
---

Rows go into a table with `INSERT INTO`. You name the table, list the columns
you're providing, and give the values:

```sql
INSERT INTO pets (name, species) VALUES ('Rex', 'dog');
```

Columns you skip get their default — for an `INTEGER PRIMARY KEY` like `id`,
SQLite assigns the next number automatically. You can also insert several rows
in one statement:

```sql
INSERT INTO pets (name, species) VALUES ('Rex', 'dog'), ('Whiskers', 'cat');
```

Note that text values use **single quotes** in SQL.

## Your task

The `users` table from the last chapter is here, but empty. Insert two users:

- `Alice`, age `30`
- `Bob`, age `21`

Let SQLite assign the `id`s. Run your statement, peek at the table in the
database viewer, then check your solution.
