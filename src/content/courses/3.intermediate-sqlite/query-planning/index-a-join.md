---
title: "Indexing a join"
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
  INSERT INTO customers (name) VALUES ('Ana'), ('Ben'), ('Cy');
  INSERT INTO orders (customer_id, total) VALUES
    (1, 50), (2, 150), (1, 300), (3, 90), (2, 220), (1, 130);
desired_state:
  query: "SELECT name FROM sqlite_master WHERE type = 'index' AND name NOT LIKE 'sqlite_%' ORDER BY name;"
  rows:
    - { name: "idx_orders_customer_id" }
---

Joins lean heavily on indexes. To join each customer to their orders:

```sql
EXPLAIN QUERY PLAN
SELECT c.name, o.total
FROM customers c
JOIN orders o ON o.customer_id = c.id;
```

SQLite walks the `customers` table and, for each one, looks up matching
`orders`. Without an index on `orders.customer_id`, that lookup is a full scan of
`orders` *for every customer* — the plan shows `SCAN orders`. Indexing the join
column fixes it:

```sql
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
```

Now the plan reads `SEARCH orders USING INDEX idx_orders_customer_id` — each
customer's orders are found directly. As a rule of thumb, **foreign-key columns
you join on are prime index candidates.**

## Your task

Look at the join's plan, then create `idx_orders_customer_id` on
`orders(customer_id)`:

```sql
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
```

Re-run the `EXPLAIN QUERY PLAN` to confirm the `SEARCH`, then check your
solution.
