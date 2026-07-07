---
title: "Reading rows with SELECT"
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
    ('Dave', 45),
    ('Erin', 15);
desired_state:
  query: "SELECT name FROM adults ORDER BY name;"
  rows:
    - { name: "Alice" }
    - { name: "Bob" }
    - { name: "Dave" }
---

`SELECT` reads rows back out of a table — it's the statement you'll run more
than any other. The building blocks:

```sql
SELECT * FROM users;                         -- every column, every row
SELECT name FROM users;                      -- just one column
SELECT name FROM users WHERE age >= 18;      -- only matching rows
SELECT name FROM users ORDER BY name;        -- sorted results
```

`WHERE` filters which rows come back, and `ORDER BY` sorts them — without it,
row order is whatever SQLite finds convenient. Experiment with each of these
against the seeded `users` table and watch the results.

One more trick: a query's result can be saved as a brand-new table with
`CREATE TABLE ... AS SELECT`:

```sql
CREATE TABLE dog_names AS SELECT name FROM pets WHERE species = 'dog';
```

## Your task

The `users` table is seeded with five people of various ages. Save the
**names of everyone 18 or older** into a new table called `adults`:

```sql
CREATE TABLE adults AS SELECT ...
```

Select only the `name` column. Run it, confirm `adults` shows up in the
database viewer, then check your solution.
