---
title: "Requiring values with NOT NULL"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT name, \"notnull\" AS nn FROM pragma_table_info('contacts') ORDER BY cid;"
  rows:
    - { name: "id", nn: 0 }
    - { name: "name", nn: 1 }
    - { name: "phone", nn: 1 }
---

A **constraint** is a rule the database enforces on every write — bad data is
rejected before it's stored, so your tables can't drift into a broken state.

The simplest is `NOT NULL`: a column marked this way must always be given a
value. Try to insert a row without one and the `INSERT` is rejected.

```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL
);
```

`pragma_table_info` reports each column's `notnull` flag as `1` (required) or
`0` (nullable).

## Your task

Create the `contacts` table above, where **both** `name` and `phone` are
`NOT NULL` (leave `id` as a plain `INTEGER PRIMARY KEY`).

Run it and check your solution — `name` and `phone` should show `notnull = 1`.
