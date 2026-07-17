---
title: "Combining conditions with AND, OR, and IN"
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
    - { title: "Dunkirk" }
    - { title: "Lady Bird" }
    - { title: "Little Women" }
---

Real questions combine several conditions. `AND` requires **both** sides to be
true; `OR` requires **either**:

```sql
SELECT title FROM movies WHERE genre = 'Sci-Fi' AND year >= 2016;
SELECT title FROM movies WHERE genre = 'Drama' OR genre = 'War';
```

When you're checking one column against a list of values, `IN` is tidier than a
chain of `OR`s — these two are equivalent:

```sql
SELECT title FROM movies WHERE genre = 'Drama' OR genre = 'War';
SELECT title FROM movies WHERE genre IN ('Drama', 'War');
```

## Your task

Find the movies that are **either Drama or War** *and* were released **in 2017
or later**. Save their titles into `answer`:

```sql
CREATE TABLE answer AS
SELECT title FROM movies
WHERE genre IN ('Drama', 'War') AND year >= 2017;
```

Check your solution — three qualify: Dunkirk, Lady Bird, and Little Women.
