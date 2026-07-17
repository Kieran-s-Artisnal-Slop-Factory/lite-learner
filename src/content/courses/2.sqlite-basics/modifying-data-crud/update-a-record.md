---
title: "Changing a row with UPDATE"
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
  query: "SELECT name, age FROM users ORDER BY name;"
  rows:
    - { name: "Alice", age: 30 }
    - { name: "Bob", age: 22 }
    - { name: "Carol", age: 17 }
    - { name: "Dave", age: 45 }
---

`UPDATE` changes values in rows that already exist. You name the table, `SET` the
new value(s), and — crucially — add a `WHERE` clause to say **which** rows to
touch:

```sql
UPDATE users SET age = 31 WHERE name = 'Alice';
```

> ⚠️ **The `WHERE` clause is the safety catch.** Leave it off and `UPDATE`
> changes *every* row in the table. Always double-check your `WHERE` before
> running an update.

## Your task

Bob just had a birthday. Update **only Bob's** row to set his `age` to `22`,
leaving everyone else untouched:

```sql
UPDATE users SET age = 22 WHERE name = 'Bob';
```

Run it and check your solution — Bob should be 22, the other three unchanged.
