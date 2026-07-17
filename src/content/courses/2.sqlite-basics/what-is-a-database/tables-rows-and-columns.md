---
title: "Tables, rows, and columns"
initial_sql: |
  CREATE TABLE movies (
    id INTEGER PRIMARY KEY,
    title TEXT,
    year INTEGER,
    rating REAL
  );
  INSERT INTO movies (title, year, rating) VALUES
    ('Inception', 2010, 8.8),
    ('Parasite', 2019, 8.5),
    ('Spirited Away', 2001, 8.6);
---

A **database** is an organized collection of data, and inside it everything
lives in **tables**. A table is like a named spreadsheet:

- each **row** is one record — one movie, one person, one order
- each **column** is one field every row has — a movie's `title`, its `year`,
  its `rating`

The little database attached to this page has one table, `movies`, with three
rows. Have a look at it in the **database** panel — the column headers show
each column's declared type (`TEXT`, `INTEGER`, `REAL`).

There's nothing to solve here, but the editor works: try

```sql
SELECT * FROM movies;
```

to read the whole table, and press **Mark as read** when it makes sense. The
next lesson turns this into your first real task.
