---
title: "Project: populating the tables"
initial_sql: |
  CREATE TABLE authors (
    id INTEGER PRIMARY KEY,
    name TEXT
  );
  CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author_id INTEGER REFERENCES authors(id),
    year INTEGER,
    available INTEGER DEFAULT 1
  );
desired_state:
  query: "SELECT title, year FROM books ORDER BY title;"
  rows:
    - { title: "1984", year: 1949 }
    - { title: "Beloved", year: 1987 }
    - { title: "Emma", year: 1815 }
    - { title: "Pride and Prejudice", year: 1813 }
---

The empty tables from the last exercise are set up and waiting. Now stock the
library. Insert the authors first (so their `id`s exist for the books to
reference), then the books.

**Authors**

| id | name          |
| -- | ------------- |
| 1  | Jane Austen   |
| 2  | George Orwell |
| 3  | Toni Morrison |

**Books** (leave `available` to its default)

| title               | author_id | year |
| ------------------- | --------- | ---- |
| Pride and Prejudice | 1         | 1813 |
| Emma                | 1         | 1815 |
| 1984                | 2         | 1949 |
| Beloved             | 3         | 1987 |

## Your task

Insert the three authors and four books. Give the authors explicit `id`s so the
books can reference them:

```sql
INSERT INTO authors (id, name) VALUES
  (1, 'Jane Austen'),
  (2, 'George Orwell'),
  (3, 'Toni Morrison');

INSERT INTO books (title, author_id, year) VALUES
  ('Pride and Prejudice', 1, 1813),
  -- add the other three books here
  ;
```

Run it and check your solution — all four books should be in the catalogue.
