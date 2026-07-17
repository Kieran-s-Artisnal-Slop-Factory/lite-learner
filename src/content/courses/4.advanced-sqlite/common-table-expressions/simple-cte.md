---
title: "Naming a subquery with WITH"
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
  query: "SELECT product FROM answer ORDER BY product;"
  rows:
    - { product: "Laptop" }
    - { product: "Monitor" }
    - { product: "Phone" }
---

A **Common Table Expression** (CTE) is a temporary, named result you define at
the top of a query with `WITH`, then use in the main query as if it were a
table. It's the tidy alternative to a nested subquery:

```sql
WITH big AS (
  SELECT product, amount FROM sales WHERE amount >= 100
)
SELECT product FROM big;
```

The `big` CTE exists only for the duration of the query. On its own a single CTE
is just readability sugar — but it's the foundation for the multi-step and
recursive queries in the rest of this chapter.

## Your task

Using a CTE named `big` that selects sales of `amount >= 100`, save the big
sellers' product names into `answer`:

```sql
CREATE TABLE answer AS
WITH big AS (
  SELECT product, amount FROM sales WHERE amount >= 100
)
SELECT product FROM big;
```

Check your solution — Laptop, Monitor, and Phone clear 100.
