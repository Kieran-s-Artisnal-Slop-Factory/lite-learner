---
title: "Updating a batch of rows"
initial_sql: |
  CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price INTEGER,
    discontinued INTEGER DEFAULT 0
  );
  INSERT INTO products (name, price) VALUES
    ('Pen', 3),
    ('Notebook', 6),
    ('Desk', 120),
    ('Eraser', 2),
    ('Chair', 85),
    ('Stapler', 9);
desired_state:
  query: "SELECT name, discontinued FROM products ORDER BY name;"
  rows:
    - { name: "Chair", discontinued: 0 }
    - { name: "Desk", discontinued: 0 }
    - { name: "Eraser", discontinued: 1 }
    - { name: "Notebook", discontinued: 1 }
    - { name: "Pen", discontinued: 1 }
    - { name: "Stapler", discontinued: 1 }
---

A single `UPDATE` changes every row its `WHERE` clause matches — so "update all
the cheap products" is one statement, not a loop. The condition does the
selecting; the database applies the change to the whole batch at once.

```sql
UPDATE products SET discontinued = 1 WHERE price < 10;
```

There's no need to update rows one id at a time — let the `WHERE` describe the
set and update them together.

## Your task

Management is discontinuing every product priced **under 10**. In one `UPDATE`,
set `discontinued = 1` for all products with `price < 10`:

```sql
UPDATE products SET discontinued = 1 WHERE price < 10;
```

Check your solution — Pen, Notebook, Eraser, and Stapler should be discontinued;
Desk and Chair should not.
