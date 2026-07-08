---
title: "Project: an availability report"
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
  INSERT INTO books (title, author_id, year, available) VALUES
    ('Pride and Prejudice', 1, 1813, 1),
    ('Emma', 1, 1815, 1),
    ('1984', 2, 1949, 0),
    ('Beloved', 3, 1987, 1);
desired_state:
  query: "SELECT title, author FROM answer ORDER BY title;"
  rows:
    - { title: "Beloved", author: "Toni Morrison" }
    - { title: "Emma", author: "Jane Austen" }
    - { title: "Pride and Prejudice", author: "Jane Austen" }
---

Final step: a report a librarian would actually use — **which books are on the
shelf right now, and who wrote them.** 1984 is currently checked out
(`available = 0`), so it should be left off.

This pulls together the whole course: a `JOIN` to bring author names in
alongside books, a `WHERE` to keep only available ones, and an `ORDER BY` to
sort the list. Book titles come from `books`, author names from `authors`,
linked on `author_id`:

```sql
SELECT b.title, a.name AS author
FROM books b
JOIN authors a ON b.author_id = a.id
WHERE b.available = 1
ORDER BY b.title;
```

## Your task

Build the availability report and save it into `answer`: the `title` and author
`name` (aliased `author`) of every **available** book:

```sql
CREATE TABLE answer AS
SELECT b.title, a.name AS author
FROM books b
JOIN authors a ON b.author_id = a.id
WHERE b.available = 1;
```

Check your solution — three books are available: Beloved, Emma, and Pride and
Prejudice. Nicely done — that's the whole Beginner course put to work.
