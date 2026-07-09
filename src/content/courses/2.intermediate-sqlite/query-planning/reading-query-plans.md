---
title: "Reading a query plan"
initial_sql: |
  CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    total INTEGER
  );
  INSERT INTO orders (customer_id, total) VALUES
    (1, 50), (2, 150), (1, 300), (3, 90),
    (2, 220), (4, 40), (1, 130), (3, 175);
desired_state:
  query: "SELECT name FROM sqlite_master WHERE type = 'index' AND name NOT LIKE 'sqlite_%' ORDER BY name;"
  rows:
    - { name: "idx_orders_total" }
---

Before optimising anything, you need to *see* how SQLite runs a query. Prefix any
query with `EXPLAIN QUERY PLAN` and it describes its strategy instead of running
it:

```sql
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE total > 100;
```

With no index, the plan reads roughly:

```
SCAN orders
```

`SCAN` means a full table scan — every row examined. That's fine for eight rows,
disastrous for eight million. Add an index on the filtered column and the plan
changes to a `SEARCH` using it:

```sql
CREATE INDEX idx_orders_total ON orders(total);
```

Re-run the `EXPLAIN QUERY PLAN` and you'll now see something like
`SEARCH orders USING INDEX idx_orders_total` — SQLite jumps to the matching rows
instead of scanning.

## Your task

1. Run the `EXPLAIN QUERY PLAN` above and note the `SCAN`.
2. Create the index `idx_orders_total` on `orders(total)`.
3. Re-run the `EXPLAIN QUERY PLAN` and watch it become a `SEARCH`.

Check your solution — the index `idx_orders_total` should exist.
