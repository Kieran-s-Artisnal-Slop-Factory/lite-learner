---
title: "Choosing columns and renaming them"
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
  query: "SELECT name, released FROM answer ORDER BY name;"
  rows:
    - { name: "Arrival", released: 2016 }
    - { name: "Dune", released: 2021 }
    - { name: "Dunkirk", released: 2017 }
    - { name: "Inception", released: 2010 }
    - { name: "Interstellar", released: 2014 }
    - { name: "Lady Bird", released: 2017 }
    - { name: "Little Women", released: 2019 }
    - { name: "Parasite", released: 2019 }
    - { name: "Spirited Away", released: 2001 }
    - { name: "Untitled Project", released: 2025 }
---

Usually you want only a couple of columns, not the whole row. List the ones you
want, separated by commas:

```sql
SELECT title, year FROM movies;
```

You can also rename a column in the output with `AS` — an **alias**. This
doesn't change the table, only the label on the result, which is handy for
tidier reports:

```sql
SELECT title AS name, year AS released FROM movies;
```

## Your task

Build a table called `answer` with two columns: the movie's title (aliased to
`name`) and its year (aliased to `released`):

```sql
CREATE TABLE answer AS
SELECT title AS name, year AS released FROM movies;
```

Check your solution — the `answer` table should have `name` and `released`
columns for all ten movies.
