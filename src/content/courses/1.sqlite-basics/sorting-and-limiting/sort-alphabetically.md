---
title: "Sorting results with ORDER BY"
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
  query: "SELECT title FROM answer ORDER BY rowid;"
  rows:
    - { title: "Arrival" }
    - { title: "Dune" }
    - { title: "Dunkirk" }
    - { title: "Inception" }
    - { title: "Interstellar" }
    - { title: "Lady Bird" }
    - { title: "Little Women" }
    - { title: "Parasite" }
    - { title: "Spirited Away" }
    - { title: "Untitled Project" }
---

Without instructions, SQLite returns rows in whatever order is convenient — you
can't rely on it. `ORDER BY` fixes the order by a column you choose:

```sql
SELECT title FROM movies ORDER BY title;
```

Text sorts alphabetically, numbers sort numerically. When we save the result
into a new table below, the rows are stored in that sorted order — so checking
them back in insertion order (`ORDER BY rowid`) proves your sort was correct.

## Your task

Save every movie title, sorted alphabetically (A→Z), into `answer`:

```sql
CREATE TABLE answer AS
SELECT title FROM movies ORDER BY title;
```

Check your solution — Arrival should come first and Untitled Project last.
