---
title: "Emptying a table"
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
  query: "SELECT COUNT(*) AS remaining FROM users;"
  rows:
    - { remaining: 0 }
---

Occasionally you really do want to clear out a table — say, to reset test data.
That's the one time you *deliberately* run `DELETE` without a `WHERE`:

```sql
DELETE FROM users;
```

Every row goes, but the **table itself stays** — its columns and structure are
intact, ready for new rows. (If you wanted to remove the table entirely, that's
a different statement: `DROP TABLE users`.)

## Your task

Clear all rows out of the `users` table, leaving it empty:

```sql
DELETE FROM users;
```

Run it and check your solution — the table should hold `0` rows afterwards.
