---
title: "Updating many rows at once"
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
    - { name: "Alice", age: 31 }
    - { name: "Bob", age: 22 }
    - { name: "Carol", age: 18 }
    - { name: "Dave", age: 46 }
---

Sometimes changing every row *is* the goal. An `UPDATE` with no `WHERE` touches
the whole table — and the `SET` expression can refer to the column's current
value, so you can adjust each row relative to itself:

```sql
UPDATE users SET age = age + 1;
```

That reads each user's current `age`, adds one, and stores the result — a
one-line "happy birthday to everyone". This is intentional and fine here;
what you want to avoid is doing it *by accident* when you meant to change one
row.

## Your task

It's New Year's Day and everyone ages a year. Increase **every** user's `age` by
`1`:

```sql
UPDATE users SET age = age + 1;
```

Run it and check your solution — all four ages should go up by one.
