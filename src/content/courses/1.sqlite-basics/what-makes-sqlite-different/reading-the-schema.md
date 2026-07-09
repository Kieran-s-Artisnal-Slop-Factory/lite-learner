---
title: "A database that describes itself"
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
  query: "SELECT type, name FROM answer ORDER BY name;"
  rows:
    - { type: "table", name: "directors" }
    - { type: "table", name: "movies" }
---

Every SQLite database keeps a built-in table describing itself, called
`sqlite_master`. It lists everything in the database — each table, index, and
view — along with the SQL that created it. Because it's just a table, you query
it with `SELECT` like any other:

```sql
SELECT type, name FROM sqlite_master;
```

Each row's `type` is what kind of object it is (`table`, `index`, `view`…) and
`name` is its name. This is how tools "know" what's inside a database file they've
never seen before — they simply read `sqlite_master`.

## Your task

Capture the list of **tables** in this database into a new table called
`answer`:

```sql
CREATE TABLE answer AS
SELECT type, name FROM sqlite_master WHERE type = 'table';
```

Check your solution — you should see the `directors` and `movies` tables.
