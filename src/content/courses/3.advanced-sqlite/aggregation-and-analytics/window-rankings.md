---
title: "Ranking with window functions"
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
  query: "SELECT product, rnk FROM answer ORDER BY rnk;"
  rows:
    - { product: "Laptop", rnk: 1 }
    - { product: "Phone", rnk: 2 }
    - { product: "Monitor", rnk: 3 }
    - { product: "Textbook", rnk: 4 }
    - { product: "Doll", rnk: 5 }
    - { product: "Blocks", rnk: 6 }
    - { product: "Novel", rnk: 7 }
    - { product: "Comic", rnk: 8 }
---

`GROUP BY` collapses rows; a **window function** computes across a set of rows
but **keeps every row**. You add an `OVER (...)` clause that defines the window.
`RANK()` numbers rows by an ordering:

```sql
SELECT product, amount,
       RANK() OVER (ORDER BY amount DESC) AS rnk
FROM sales;
```

Every product stays in the result, now tagged with its position by sales amount.
The `OVER` clause can also `PARTITION BY` a column to rank *within* groups (say,
best seller per category) — and other window functions like `SUM(...) OVER (...)`
compute running totals the same way.

## Your task

Rank every product by `amount`, highest first, and save the `product`, `amount`,
and its rank (as `rnk`) into `answer`:

```sql
CREATE TABLE answer AS
SELECT product, amount,
       RANK() OVER (ORDER BY amount DESC) AS rnk
FROM sales;
```

Check your solution — Laptop is #1 and Comic is #8.
