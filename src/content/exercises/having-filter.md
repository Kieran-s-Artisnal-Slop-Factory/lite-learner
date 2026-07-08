---
title: "Filtering groups with HAVING"
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
  query: "SELECT category, total FROM answer ORDER BY category;"
  rows:
    - { category: "Books", total: 105 }
    - { category: "Electronics", total: 2300 }
---

`WHERE` filters rows *before* grouping; to filter on an aggregate you need
`HAVING`, which filters the **groups** *after* they're formed. You can't put
`SUM(amount) > 100` in a `WHERE` (the sum doesn't exist yet) — that's exactly the
job of `HAVING`:

```sql
SELECT category, SUM(amount) AS total
FROM sales
GROUP BY category
HAVING SUM(amount) > 100;
```

The order SQLite applies them: `WHERE` → `GROUP BY` → `HAVING`. Use `WHERE` to
throw out individual rows, `HAVING` to throw out whole groups.

## Your task

Find the categories whose total sales exceed `100`. Save the `category` and its
`total` into `answer`:

```sql
CREATE TABLE answer AS
SELECT category, SUM(amount) AS total
FROM sales
GROUP BY category
HAVING SUM(amount) > 100;
```

Check your solution — Books (105) and Electronics (2300) qualify; Toys (55) is
filtered out.
