---
title: "Deleting a batch of rows"
initial_sql: |
  CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price INTEGER,
    discontinued INTEGER
  );
  INSERT INTO products (name, price, discontinued) VALUES
    ('Pen', 3, 1),
    ('Notebook', 6, 0),
    ('Desk', 120, 1),
    ('Eraser', 2, 0),
    ('Chair', 85, 0),
    ('Stapler', 9, 1);
desired_state:
  query: "SELECT name FROM products ORDER BY name;"
  rows:
    - { name: "Chair" }
    - { name: "Eraser" }
    - { name: "Notebook" }
---

Just like `UPDATE`, a single `DELETE` removes every row matching its `WHERE`
clause — a whole batch in one statement. It's the standard way to purge records
that share a property: expired sessions, soft-deleted rows, discontinued stock.

```sql
DELETE FROM products WHERE discontinued = 1;
```

As always with `DELETE`, the `WHERE` clause is doing the important work — it
decides exactly which batch disappears, so check it carefully before running.

## Your task

Now actually clear out the discontinued products. In one `DELETE`, remove every
row where `discontinued = 1`:

```sql
DELETE FROM products WHERE discontinued = 1;
```

Check your solution — only Notebook, Eraser, and Chair should remain.
