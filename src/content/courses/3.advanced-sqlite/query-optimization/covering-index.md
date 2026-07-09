---
title: "Building a covering index"
initial_sql: |
  CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    total INTEGER
  );
  INSERT INTO orders (customer_id, total) VALUES
    (1, 50), (2, 150), (1, 300), (3, 90), (2, 220), (1, 130);
desired_state:
  query: "SELECT name FROM pragma_index_info('idx_orders_cust_total') ORDER BY seqno;"
  rows:
    - { name: "customer_id" }
    - { name: "total" }
---

A **covering index** contains *every column a query needs* — so SQLite can answer
the query from the index alone, never touching the table. That skips a whole set
of lookups and is one of the biggest speedups available.

Take this query:

```sql
SELECT total FROM orders WHERE customer_id = 1;
```

It reads two columns: `customer_id` (to filter) and `total` (to return). An index
on **both**, in that order, covers it completely:

```sql
CREATE INDEX idx_orders_cust_total ON orders(customer_id, total);
```

Run `EXPLAIN QUERY PLAN` on the query afterwards and you'll see
`USING COVERING INDEX` — the giveaway that the table itself was never read.

## Your task

Create a covering index named `idx_orders_cust_total` on `orders`, covering
`customer_id` then `total`:

```sql
CREATE INDEX idx_orders_cust_total ON orders(customer_id, total);
```

Check your solution — the index should cover `customer_id` and `total`, in that
order.
