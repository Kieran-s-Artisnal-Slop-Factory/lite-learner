---
title: "Capstone: the bookstore schema"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT name, \"notnull\" AS nn, dflt_value FROM pragma_table_info('books') ORDER BY cid;"
  rows:
    - { name: "id", nn: 0, dflt_value: null }
    - { name: "title", nn: 1, dflt_value: null }
    - { name: "author_id", nn: 0, dflt_value: null }
    - { name: "price", nn: 1, dflt_value: null }
    - { name: "stock", nn: 1, dflt_value: "0" }
---

The finale: a production-style **bookstore** database, built over five exercises
using the whole course. It has three tables:

- **`authors`** — one row per author.
- **`books`** — each references an author, with a required title, a non-negative
  price, and stock defaulting to 0.
- **`sales`** — each records a book, a quantity, a unit price, and a
  **generated** `line_total` (`qty * unit_price`).

## Your task

Create all three tables. Here are `authors` and `sales`; write `books` to match
the description above.

```sql
CREATE TABLE authors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE sales (
  id INTEGER PRIMARY KEY,
  book_id INTEGER REFERENCES books(id),
  qty INTEGER NOT NULL CHECK (qty > 0),
  unit_price INTEGER NOT NULL,
  line_total INTEGER GENERATED ALWAYS AS (qty * unit_price) STORED
);
```

For `books`, use: `id INTEGER PRIMARY KEY`, `title TEXT NOT NULL`,
`author_id INTEGER REFERENCES authors(id)`,
`price INTEGER NOT NULL CHECK (price >= 0)`, and
`stock INTEGER NOT NULL DEFAULT 0`.

Check your solution — it inspects the `books` columns, their `NOT NULL` flags,
and the `stock` default.
