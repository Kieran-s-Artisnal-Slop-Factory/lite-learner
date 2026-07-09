---
title: "Joining three tables"
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
  CREATE TABLE reviews (
    id INTEGER PRIMARY KEY,
    movie_id INTEGER REFERENCES movies(id),
    source TEXT,
    score INTEGER
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
  INSERT INTO reviews (movie_id, source, score) VALUES
    (1, 'Empire', 90),
    (6, 'Empire', 95),
    (7, 'Empire', 97);
desired_state:
  query: "SELECT title, director, score FROM answer ORDER BY title;"
  rows:
    - { title: "Inception", director: "Christopher Nolan", score: 90 }
    - { title: "Parasite", director: "Bong Joon-ho", score: 95 }
    - { title: "Spirited Away", director: "Hayao Miyazaki", score: 97 }
---

Joins chain: once two tables are joined, you can join a third onto the result.
This database now has a `reviews` table too, where each review points at a movie
via `movie_id`.

To build a report of movie, director, and review score, join all three, linking
each pair on its matching columns:

```sql
SELECT m.title, d.name AS director, r.score
FROM reviews r
JOIN movies r_movie ... -- one join per link
```

Written out with aliases:

```sql
SELECT m.title, d.name AS director, r.score
FROM reviews r
JOIN movies m    ON r.movie_id = m.id
JOIN directors d ON m.director_id = d.id;
```

Only movies that have a review appear (these are inner joins), and each is
paired with its director.

## Your task

Save a report of every reviewed movie — its title, director (aliased
`director`), and review `score` — into `answer`:

```sql
CREATE TABLE answer AS
SELECT m.title, d.name AS director, r.score
FROM reviews r
JOIN movies m    ON r.movie_id = m.id
JOIN directors d ON m.director_id = d.id;
```

Check your solution — three reviewed movies come back: Inception (90),
Parasite (95), and Spirited Away (97).
