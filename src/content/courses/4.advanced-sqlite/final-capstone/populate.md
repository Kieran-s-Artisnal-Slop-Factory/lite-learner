---
title: "Capstone: stocking the store"
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
desired_state:
  query: "SELECT title, price, stock FROM books ORDER BY title;"
  rows:
    - { title: "Machines", price: 30, stock: 50 }
    - { title: "Notes", price: 20, stock: 100 }
    - { title: "Poems", price: 15, stock: 0 }
---

The schema is ready; now stock the store. Insert the authors first (so their
`id`s exist for the books to reference), then the books.

**Authors**

| id | name         |
| -- | ------------ |
| 1  | Ada Lovelace |
| 2  | Alan Turing  |

**Books**

| id | title    | author_id | price | stock |
| -- | -------- | --------- | ----- | ----- |
| 1  | Notes    | 1         | 20    | 100   |
| 2  | Machines | 2         | 30    | 50    |
| 3  | Poems    | 1         | 15    | 0     |

## Your task

Insert the two authors and three books:

```sql
INSERT INTO authors (id, name) VALUES
  (1, 'Ada Lovelace'),
  (2, 'Alan Turing');

INSERT INTO books (id, title, author_id, price, stock) VALUES
  (1, 'Notes', 1, 20, 100),
  (2, 'Machines', 2, 30, 50),
  (3, 'Poems', 1, 15, 0);
```

Check your solution — all three books should be on the shelves.
