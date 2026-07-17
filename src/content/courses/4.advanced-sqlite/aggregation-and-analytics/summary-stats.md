---
title: "Aggregate functions"
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
  query: "SELECT n, total, avg, lo, hi FROM answer;"
  rows:
    - { n: 8, total: 2460, avg: 307.5, lo: 10, hi: 1200 }
---

**Aggregate functions** collapse many rows into a single summary value. The core
five:

- `COUNT(*)` — how many rows
- `SUM(col)` — total
- `AVG(col)` — mean
- `MIN(col)` / `MAX(col)` — smallest / largest

You can compute several at once in one `SELECT`:

```sql
SELECT
  COUNT(*)    AS n,
  SUM(amount) AS total,
  AVG(amount) AS avg,
  MIN(amount) AS lo,
  MAX(amount) AS hi
FROM sales;
```

Without a `GROUP BY`, they summarise the whole table into one row.

## Your task

Compute those five summary statistics over all sales and save them into
`answer` (columns `n`, `total`, `avg`, `lo`, `hi`):

```sql
CREATE TABLE answer AS
SELECT
  COUNT(*)    AS n,
  SUM(amount) AS total,
  AVG(amount) AS avg,
  MIN(amount) AS lo,
  MAX(amount) AS hi
FROM sales;
```

Check your solution — 8 sales, totalling 2460, averaging 307.5, from 10 up to
1200.
