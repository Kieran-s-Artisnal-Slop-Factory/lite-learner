---
title: "Capstone: revenue by author"
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
  query: "SELECT name, rev FROM answer ORDER BY name;"
  rows:
    - { name: "Ada Lovelace", rev: 60 }
    - { name: "Alan Turing", rev: 90 }
---

The final report: **total revenue per author.** This ties the whole course
together — the generated `line_total` column, a CTE for readability, and joins
across all three tables.

Sum each book's sales into per-author revenue with a CTE, then attach author
names:

```sql
WITH revenue AS (
  SELECT b.author_id, SUM(s.line_total) AS rev
  FROM sales s
  JOIN books b ON s.book_id = b.id
  GROUP BY b.author_id
)
SELECT a.name, r.rev
FROM revenue r
JOIN authors a ON a.id = r.author_id;
```

Ada's sales are on Notes (2×20 + 1×20 = 60); Alan's are on Machines (3×30 = 90).

## Your task

Build the revenue-by-author report and save it into `answer` (columns `name`
and `rev`), using the query above.

Check your solution — Ada Lovelace at `60` and Alan Turing at `90`. That's the
entire Advanced course, working as one system — congratulations on finishing.
