---
title: "Summarizing per group with GROUP BY"
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
  query: "SELECT category, total, cnt FROM answer ORDER BY category;"
  rows:
    - { category: "Books", total: 105, cnt: 3 }
    - { category: "Electronics", total: 2300, cnt: 3 }
    - { category: "Toys", total: 55, cnt: 2 }
---

`GROUP BY` runs the aggregates **once per group** instead of once over the whole
table. You list the grouping column(s), and every aggregate is computed within
each group:

```sql
SELECT category, SUM(amount) AS total, COUNT(*) AS cnt
FROM sales
GROUP BY category;
```

That yields one row per category — its total sales and how many items sold. A
good rule: every column in the `SELECT` should either be in the `GROUP BY` or
wrapped in an aggregate.

## Your task

Produce a per-category summary — the `category`, its `SUM(amount)` as `total`,
and its `COUNT(*)` as `cnt` — into `answer`:

```sql
CREATE TABLE answer AS
SELECT category, SUM(amount) AS total, COUNT(*) AS cnt
FROM sales
GROUP BY category;
```

Check your solution — Books (105, 3 items), Electronics (2300, 3), Toys (55, 2).
