---
title: "Chaining multiple CTEs"
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
  query: "SELECT category FROM answer ORDER BY category;"
  rows:
    - { category: "Books" }
    - { category: "Electronics" }
---

You can define several CTEs in one `WITH`, separated by commas, and each may
build on the ones before it. This lets you express a pipeline as a sequence of
readable steps instead of one deeply-nested query:

```sql
WITH
  cat_totals AS (
    SELECT category, SUM(amount) AS total FROM sales GROUP BY category
  ),
  top_cats AS (
    SELECT category FROM cat_totals WHERE total > 100
  )
SELECT category FROM top_cats;
```

The first CTE rolls sales up per category; the second filters that result. Read
top-to-bottom, each step's name documents what it produces.

## Your task

Using two chained CTEs — one that totals `amount` per `category`, one that keeps
categories totalling over `100` — save the qualifying category names into
`answer`:

```sql
CREATE TABLE answer AS
WITH
  cat_totals AS (
    SELECT category, SUM(amount) AS total FROM sales GROUP BY category
  ),
  top_cats AS (
    SELECT category FROM cat_totals WHERE total > 100
  )
SELECT category FROM top_cats;
```

Check your solution — Books (105) and Electronics (2300) qualify; Toys (55)
doesn't.
