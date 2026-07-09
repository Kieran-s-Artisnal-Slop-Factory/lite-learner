---
title: "Creating a view"
initial_sql: |
  CREATE TABLE sales (
    id INTEGER PRIMARY KEY,
    product TEXT,
    category TEXT,
    amount INTEGER
  );
  INSERT INTO sales (product, category, amount) VALUES
    ('Laptop', 'Electronics', 1200),
    ('Phone', 'Electronics', 800),
    ('Monitor', 'Electronics', 300),
    ('Novel', 'Books', 15),
    ('Textbook', 'Books', 80),
    ('Comic', 'Books', 10),
    ('Blocks', 'Toys', 25),
    ('Doll', 'Toys', 30);
desired_state:
  query: "SELECT product FROM big_sales ORDER BY product;"
  rows:
    - { product: "Laptop" }
    - { product: "Monitor" }
    - { product: "Phone" }
---

A **view** is a stored `SELECT` that you can query like a table. It holds no data
of its own — every time you query it, SQLite runs the underlying `SELECT` — but
it gives a complex query a simple name.

```sql
CREATE VIEW big_sales AS
SELECT product, amount FROM sales WHERE amount >= 100;
```

Now `SELECT * FROM big_sales` runs that query for you. Views are read-only here
by default: you query them, you don't insert into them.

## Your task

Create a view named `big_sales` that selects the `product` and `amount` of every
sale of `100` or more:

```sql
CREATE VIEW big_sales AS
SELECT product, amount FROM sales WHERE amount >= 100;
```

Run it and check your solution — querying the view should return Laptop,
Monitor, and Phone.
