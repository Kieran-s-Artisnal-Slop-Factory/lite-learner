---
title: "Querying a view like a table"
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
  CREATE VIEW category_totals AS
  SELECT category, SUM(amount) AS total FROM sales GROUP BY category;
desired_state:
  query: "SELECT category, total FROM answer ORDER BY category;"
  rows:
    - { category: "Books", total: 105 }
    - { category: "Electronics", total: 2300 }
---

Because a view acts like a table, you can filter, sort, and even join it — the
aggregation or joins inside it are computed on demand. This database already has
a `category_totals` view that rolls sales up per category:

```sql
CREATE VIEW category_totals AS
SELECT category, SUM(amount) AS total FROM sales GROUP BY category;
```

You can now treat those totals as a table and query them further, without
repeating the `GROUP BY`:

```sql
SELECT category, total FROM category_totals WHERE total > 100;
```

## Your task

Query the `category_totals` view for the categories totalling more than `100`,
and save `category` and `total` into `answer`:

```sql
CREATE TABLE answer AS
SELECT category, total FROM category_totals WHERE total > 100;
```

Check your solution — Books (105) and Electronics (2300) clear the bar.
