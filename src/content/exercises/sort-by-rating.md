---
title: "Sorting high-to-low with DESC"
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
    - { title: "Inception" }
    - { title: "Interstellar" }
    - { title: "Spirited Away" }
    - { title: "Parasite" }
    - { title: "Dune" }
    - { title: "Arrival" }
    - { title: "Dunkirk" }
    - { title: "Little Women" }
    - { title: "Lady Bird" }
    - { title: "Untitled Project" }
---

`ORDER BY` sorts ascending by default (`ASC`). Add `DESC` to sort the other way
— largest first — which is how you build "highest rated" or "most recent"
lists:

```sql
SELECT title, rating FROM movies ORDER BY rating DESC;
```

Two movies are tied at 8.6. When values tie, their relative order isn't
guaranteed, so add a **tiebreaker** column to make it deterministic — here,
title A→Z:

```sql
SELECT title, rating FROM movies ORDER BY rating DESC, title;
```

The unrated movie's `rating` is `NULL`; SQLite sorts `NULL`s last under `DESC`,
so it lands at the bottom.

## Your task

Save the titles, ordered by `rating` from highest to lowest with `title` as the
tiebreaker, into `answer`:

```sql
CREATE TABLE answer AS
SELECT title, rating FROM movies ORDER BY rating DESC, title;
```

Check your solution — Inception (8.8) leads and Untitled Project (unrated) is
last.
