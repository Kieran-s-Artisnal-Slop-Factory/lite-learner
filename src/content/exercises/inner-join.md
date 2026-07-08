---
title: "Combining tables with INNER JOIN"
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
---

Data is split across tables to avoid repetition: `movies` stores a
`director_id`, and the director's actual name lives once in `directors`. To show
them together you **join** the tables on the matching columns.

An `INNER JOIN` pairs each movie with the director whose `id` equals the movie's
`director_id`:

```sql
SELECT movies.title, directors.name
FROM movies
JOIN directors ON movies.director_id = directors.id;
```

Typing full table names gets tedious, so tables are usually given short
**aliases** (`m`, `d`) right after their name:

```sql
SELECT m.title, d.name AS director
FROM movies m
JOIN directors d ON m.director_id = d.id;
```

An inner join keeps **only rows that match on both sides**. The Untitled
Project has no director (`director_id` is `NULL`), so it won't appear.

## Your task

Save each movie's title next to its director's name (aliased `director`) into
`answer`:

```sql
CREATE TABLE answer AS
SELECT m.title, d.name AS director
FROM movies m
JOIN directors d ON m.director_id = d.id;
```

Check your solution — nine movies appear, each paired with its director.
