---
title: "Finding unmatched rows"
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
  query: "SELECT name FROM answer ORDER BY name;"
  rows:
    - { name: "Agnès Varda" }
---

A `LEFT JOIN` has a clever second use: finding rows with **no** match. Keep
every row from the left table, then filter down to the ones where the right side
came back `NULL` — those are the unmatched ones. This is called an **anti-join**.

Which directors have no movies in the database? Start from `directors`, left
join `movies`, and keep only directors where no movie was found:

```sql
SELECT d.name
FROM directors d
LEFT JOIN movies m ON m.director_id = d.id
WHERE m.id IS NULL;
```

The `WHERE m.id IS NULL` is the trick: a matched director would have a real
`m.id`, so `NULL` there means "no movie linked to this director".

## Your task

Save the names of directors with **no movies** into `answer`:

```sql
CREATE TABLE answer AS
SELECT d.name
FROM directors d
LEFT JOIN movies m ON m.director_id = d.id
WHERE m.id IS NULL;
```

Check your solution — Agnès Varda is in the database but has no movies yet.
