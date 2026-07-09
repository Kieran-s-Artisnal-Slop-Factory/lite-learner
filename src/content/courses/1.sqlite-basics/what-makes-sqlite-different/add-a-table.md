---
title: "Growing a database over time"
initial_sql: |
  CREATE TABLE directors (
    id INTEGER PRIMARY KEY,
    name TEXT,
    country TEXT
  );
  CREATE TABLE movies (
    id INTEGER PRIMARY KEY,
    title TEXT,
    year INTEGER,
    runtime INTEGER,
    rating REAL,
    genre TEXT,
    director_id INTEGER REFERENCES directors(id)
  );
desired_state:
  query: "SELECT name, type, pk FROM pragma_table_info('genres') ORDER BY cid;"
  rows:
    - { name: "id", type: "INTEGER", pk: 1 }
    - { name: "name", type: "TEXT", pk: 0 }
---

A SQLite database isn't frozen the moment you create it — you can add tables to
it at any time as an app's needs grow. This database already has `movies` and
`directors`. Adding a third table sits it right alongside them in the same
file; the existing tables and their data are untouched.

```sql
CREATE TABLE studios (id INTEGER PRIMARY KEY, name TEXT);
```

## Your task

This movie database has genres stored as loose text on each movie. Add a proper
`genres` table so genres could later become records of their own. Create it with
two columns:

1. `id` — `INTEGER PRIMARY KEY`
2. `name` — `TEXT`

Run it and check your solution. The `movies` and `directors` tables should still
be there, now joined by `genres`.
