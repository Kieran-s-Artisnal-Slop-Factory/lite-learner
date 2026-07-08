---
title: "Sorting by more than one column"
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
  query: "SELECT genre, title, year FROM answer ORDER BY rowid;"
  rows:
    - { genre: null, title: "Untitled Project", year: 2025 }
    - { genre: "Animation", title: "Spirited Away", year: 2001 }
    - { genre: "Drama", title: "Little Women", year: 2019 }
    - { genre: "Drama", title: "Lady Bird", year: 2017 }
    - { genre: "Sci-Fi", title: "Dune", year: 2021 }
    - { genre: "Sci-Fi", title: "Arrival", year: 2016 }
    - { genre: "Sci-Fi", title: "Interstellar", year: 2014 }
    - { genre: "Sci-Fi", title: "Inception", year: 2010 }
    - { genre: "Thriller", title: "Parasite", year: 2019 }
    - { genre: "War", title: "Dunkirk", year: 2017 }
---

`ORDER BY` can take several columns. It sorts by the first; ties are broken by
the second, then the third, and so on. Each column gets its own direction:

```sql
SELECT genre, title, year FROM movies
ORDER BY genre, year DESC;
```

That groups movies by genre alphabetically, and *within* each genre lists the
newest first. `NULL` genres sort to the top under ascending order.

## Your task

Sort the movies by `genre` (A→Z), then by `year` newest-first, then by `title`
as a final tiebreaker. Save `genre`, `title`, and `year` into `answer`:

```sql
CREATE TABLE answer AS
SELECT genre, title, year FROM movies
ORDER BY genre, year DESC, title;
```

Check your solution — genres run from the unrated placeholder through to War,
with newer films first inside each genre.
