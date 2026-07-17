---
title: "Capstone: a catalogue view"
initial_sql: |
  CREATE TABLE authors (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  );
  CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    author_id INTEGER REFERENCES authors(id),
    price INTEGER NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE sales (
    id INTEGER PRIMARY KEY,
    book_id INTEGER REFERENCES books(id),
    qty INTEGER NOT NULL CHECK (qty > 0),
    unit_price INTEGER NOT NULL,
    line_total INTEGER GENERATED ALWAYS AS (qty * unit_price) STORED
  );
  INSERT INTO authors (id, name) VALUES (1, 'Ada Lovelace'), (2, 'Alan Turing');
  INSERT INTO books (id, title, author_id, price, stock) VALUES
    (1, 'Notes', 1, 20, 100),
    (2, 'Machines', 2, 30, 50),
    (3, 'Poems', 1, 15, 0);
  INSERT INTO sales (book_id, qty, unit_price) VALUES (1, 2, 20), (1, 1, 20), (2, 3, 30);
desired_state:
  query: "SELECT title, author FROM catalog ORDER BY title;"
  rows:
    - { title: "Machines", author: "Alan Turing" }
    - { title: "Notes", author: "Ada Lovelace" }
    - { title: "Poems", author: "Ada Lovelace" }
---

Storefronts want to show a book next to its author's name — a query that joins
`books` to `authors` every time. Rather than repeat that join everywhere, wrap it
in a **view** the rest of the app can read like a table.

```sql
CREATE VIEW catalog AS
SELECT b.title, a.name AS author, b.price
FROM books b
JOIN authors a ON b.author_id = a.id;
```

## Your task

Create the `catalog` view above, joining each book to its author (aliased
`author`).

Check your solution — querying `catalog` should pair each title with its author:
Machines/Alan Turing, Notes and Poems/Ada Lovelace.
