---
title: "Discovering foreign keys"
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
  query: "SELECT ref_table, from_col, to_col FROM answer;"
  rows:
    - { ref_table: "directors", from_col: "director_id", to_col: "id" }
---

A **foreign key** is a column that points at a row in another table. In
`movies`, the `director_id` column holds the `id` of a row in `directors` —
that's how a movie is linked to its director. Foreign keys are the wiring that
turns separate tables into a connected database.

`pragma_foreign_key_list` reveals a table's links. Its columns include `table`
(the table pointed at), `from` (the local column), and `to` (the target
column). Those are reserved words, so wrap them in double quotes when you select
them:

```sql
SELECT "table", "from", "to" FROM pragma_foreign_key_list('movies');
```

## Your task

Capture the `movies` table's foreign key into `answer`, giving the columns
friendlier names:

```sql
CREATE TABLE answer AS
SELECT "table" AS ref_table, "from" AS from_col, "to" AS to_col
FROM pragma_foreign_key_list('movies');
```

Check your solution — `movies.director_id` points at `directors.id`.
