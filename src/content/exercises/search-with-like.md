---
title: "Pattern matching with LIKE"
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
  query: "SELECT title FROM answer ORDER BY title;"
  rows:
    - { title: "Inception" }
    - { title: "Interstellar" }
---

To search text by pattern rather than an exact match, use `LIKE` with wildcards:

- `%` matches any run of characters (including none)
- `_` matches exactly one character

```sql
SELECT title FROM movies WHERE title LIKE 'In%';    -- starts with "In"
SELECT title FROM movies WHERE title LIKE '%a';     -- ends with "a"
SELECT title FROM movies WHERE title LIKE '%war%';  -- contains "war"
```

By default `LIKE` is **case-insensitive** for ASCII letters in SQLite, so
`'in%'` and `'IN%'` match the same rows.

## Your task

Save the titles of every movie whose name **starts with `In`** into `answer`:

```sql
CREATE TABLE answer AS
SELECT title FROM movies WHERE title LIKE 'In%';
```

Check your solution — two titles match: Inception and Interstellar.
