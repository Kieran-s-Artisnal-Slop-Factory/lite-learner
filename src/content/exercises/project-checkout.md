---
title: "Project: checking out a book"
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
  INSERT INTO authors (id, name) VALUES
    (1, 'Jane Austen'),
    (2, 'George Orwell'),
    (3, 'Toni Morrison');
  INSERT INTO books (title, author_id, year) VALUES
    ('Pride and Prejudice', 1, 1813),
    ('Emma', 1, 1815),
    ('1984', 2, 1949),
    ('Beloved', 3, 1987);
desired_state:
  query: "SELECT title, available FROM books ORDER BY title;"
  rows:
    - { title: "1984", available: 0 }
    - { title: "Beloved", available: 1 }
    - { title: "Emma", available: 1 }
    - { title: "Pride and Prejudice", available: 1 }
---

The library is stocked and every book is available (`available = 1`). A patron
wants to borrow **1984**. Checking a book out means flipping its `available`
flag to `0` — and *only* that book's.

This is an `UPDATE` with a careful `WHERE`, exactly like Chapter 9. Remember:
without the `WHERE`, you'd mark the entire catalogue as checked out.

## Your task

Mark **1984** as checked out by setting its `available` to `0`, leaving the
other three books available:

```sql
UPDATE books SET available = 0 WHERE title = '1984';
```

Run it and check your solution — only 1984 should read `available = 0`.
