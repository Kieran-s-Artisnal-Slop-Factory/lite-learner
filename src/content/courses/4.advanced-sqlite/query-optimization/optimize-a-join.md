---
title: "Optimizing a slow report"
initial_sql: |
  CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    name TEXT
  );
  CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    total INTEGER
  );
  INSERT INTO customers (name) VALUES ('Ada'), ('Bo'), ('Cy');
  INSERT INTO orders (customer_id, total) VALUES
    (1, 50), (2, 150), (1, 300), (3, 90), (2, 220), (1, 130);
desired_state:
  query: "SELECT name FROM sqlite_master WHERE type = 'index' AND name NOT LIKE 'sqlite_%' ORDER BY name;"
  rows:
    - { name: "idx_orders_customer_id" }
---

Putting it together: this report totals each customer's orders.

```sql
SELECT c.name, SUM(o.total)
FROM customers c
JOIN orders o ON o.customer_id = c.id
GROUP BY c.id;
```

Measure before you optimise — check the plan:

```sql
EXPLAIN QUERY PLAN
SELECT c.name, SUM(o.total)
FROM customers c JOIN orders o ON o.customer_id = c.id
GROUP BY c.id;
```

It shows `SCAN orders` — for every customer, SQLite scans the whole `orders`
table to find their rows. The join keys off `orders.customer_id`, so that's the
column to index. Add it, re-run the plan, and the `SCAN` becomes a `SEARCH`.

## Your task

Create the index that speeds up the join — `idx_orders_customer_id` on
`orders(customer_id)`:

```sql
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
```

Re-run the `EXPLAIN QUERY PLAN` to confirm the improvement, then check your
solution.
