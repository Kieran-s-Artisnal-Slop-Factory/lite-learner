---
title: "Capstone: automatic stock updates"
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
desired_state:
  query: "SELECT id, stock FROM books ORDER BY id;"
  rows:
    - { id: 1, stock: 90 }
    - { id: 2, stock: 50 }
    - { id: 3, stock: 0 }
---

A sale should draw down stock automatically — the application shouldn't have to
remember to. A trigger makes the database do it: whenever a row lands in
`sales`, reduce the matching book's `stock` by the quantity sold.

```sql
CREATE TRIGGER reduce_stock
AFTER INSERT ON sales
BEGIN
  UPDATE books SET stock = stock - NEW.qty WHERE id = NEW.book_id;
END;
```

## Your task

1. Create the `reduce_stock` trigger above.
2. Record a sale of **10** copies of book `1` (Notes) at unit price `20`:

```sql
INSERT INTO sales (book_id, qty, unit_price) VALUES (1, 10, 20);
```

The trigger should drop Notes' stock from 100 to 90.

Check your solution — book 1 should have `stock` 90, the others unchanged.
