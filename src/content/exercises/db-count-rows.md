---
title: "Rows are records: counting them"
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
  INSERT INTO directors (id, name, country) VALUES
    (1, 'Christopher Nolan', 'United Kingdom'),
    (2, 'Greta Gerwig', 'United States'),
    (3, 'Bong Joon-ho', 'South Korea'),
    (4, 'Hayao Miyazaki', 'Japan'),
    (5, 'Denis Villeneuve', 'Canada'),
    (6, 'Agnès Varda', 'France');
  INSERT INTO movies (id, title, year, runtime, rating, genre, director_id) VALUES
    (1, 'Inception', 2010, 148, 8.8, 'Sci-Fi', 1),
    (2, 'Interstellar', 2014, 169, 8.6, 'Sci-Fi', 1),
    (3, 'Dunkirk', 2017, 106, 7.8, 'War', 1),
    (4, 'Lady Bird', 2017, 94, 7.4, 'Drama', 2),
    (5, 'Little Women', 2019, 135, 7.8, 'Drama', 2),
    (6, 'Parasite', 2019, 132, 8.5, 'Thriller', 3),
    (7, 'Spirited Away', 2001, 125, 8.6, 'Animation', 4),
    (8, 'Dune', 2021, 155, 8.0, 'Sci-Fi', 5),
    (9, 'Arrival', 2016, 116, 7.9, 'Sci-Fi', 5),
    (10, 'Untitled Project', 2025, NULL, NULL, NULL, NULL);
desired_state:
  query: "SELECT movie_count FROM answer;"
  rows:
    - { movie_count: 10 }
---

A **database** is an organized collection of data. Inside it, data lives in
**tables** — think of a table as a spreadsheet with a name. This database has
two tables, `movies` and `directors`.

Each **row** in a table is one record: one movie, one director. Each **column**
is one field that every row has — a movie's `title`, `year`, `rating`, and so
on.

Start by having a look around. Run this to see every movie:

```sql
SELECT * FROM movies;
```

The `*` means "all columns", so you get the whole table back. To count the rows
instead of listing them, SQLite has `COUNT(*)`:

```sql
SELECT COUNT(*) FROM movies;
```

## Your task

Find out how many movies are in the database and save the number so it can be
checked. Run exactly this:

```sql
CREATE TABLE answer AS SELECT COUNT(*) AS movie_count FROM movies;
```

This makes a new little table called `answer` holding the count. Check your
solution — you should find the database has **10** movies.
