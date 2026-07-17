---
title: "Keeping unmatched rows with LEFT JOIN"
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
  query: "SELECT title, director FROM answer ORDER BY title;"
  rows:
    - { title: "Arrival", director: "Denis Villeneuve" }
    - { title: "Dune", director: "Denis Villeneuve" }
    - { title: "Dunkirk", director: "Christopher Nolan" }
    - { title: "Inception", director: "Christopher Nolan" }
    - { title: "Interstellar", director: "Christopher Nolan" }
    - { title: "Lady Bird", director: "Greta Gerwig" }
    - { title: "Little Women", director: "Greta Gerwig" }
    - { title: "Parasite", director: "Bong Joon-ho" }
    - { title: "Spirited Away", director: "Hayao Miyazaki" }
    - { title: "Untitled Project", director: null }
---

An inner join silently drops rows that don't match — which is a problem when you
want *every* movie listed, even one still missing its director. A `LEFT JOIN`
keeps **every row from the left table**, filling the right side with `NULL` when
there's no match:

```sql
SELECT m.title, d.name AS director
FROM movies m
LEFT JOIN directors d ON m.director_id = d.id;
```

Now the Untitled Project appears too, with a `NULL` director. The "left" table
is simply the one named first (`movies` here); its rows are all preserved.

## Your task

List **all ten** movies with their director (aliased `director`), keeping movies
that have none, and save the result into `answer`:

```sql
CREATE TABLE answer AS
SELECT m.title, d.name AS director
FROM movies m
LEFT JOIN directors d ON m.director_id = d.id;
```

Check your solution — all ten movies appear, and the Untitled Project's
director is `NULL`.
