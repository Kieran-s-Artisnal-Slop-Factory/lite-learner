---
term: Primary key
short: A column (or set of columns) whose value uniquely identifies each row in a table, so no two rows can share it.
---

A **primary key** is the column, or combination of columns, that uniquely
identifies every row in a [[table]]. No two rows may share the same primary
key value, and it can never be `NULL`.

```sql
CREATE TABLE users (
  id    INTEGER PRIMARY KEY,
  email TEXT NOT NULL
);
```

In SQLite, an `INTEGER PRIMARY KEY` column is special: it aliases the table's
internal `rowid`, so lookups by it are as fast as SQLite can go. A primary key
is what a [[foreign-key]] in another table points at to form a relationship.
