---
title: "Gathering statistics with ANALYZE"
initial_sql: |
  CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    city TEXT
  );
  INSERT INTO customers (city) VALUES
    ('Toronto'), ('Halifax'), ('Toronto'), ('Calgary'), ('Toronto');
  CREATE INDEX idx_customers_city ON customers(city);
desired_state:
  query: "SELECT tbl, idx FROM sqlite_stat1 ORDER BY idx;"
  rows:
    - { tbl: "customers", idx: "idx_customers_city" }
---

The query planner decides *how* to run a query — which index to use, which table
to scan first. It makes smarter decisions when it knows the shape of your data:
how many rows a table has, how selective an index is. `ANALYZE` gathers those
**statistics** and stores them in a table called `sqlite_stat1`.

```sql
ANALYZE;
```

That scans the tables and indexes and records stats the planner then consults.
On a database whose data has grown or changed a lot, re-running `ANALYZE` can
fix plans that have gone stale. You can inspect what it collected:

```sql
SELECT tbl, idx, stat FROM sqlite_stat1;
```

## Your task

Run `ANALYZE` to gather statistics for this database (it has a `customers` table
with an index on `city`).

```sql
ANALYZE;
```

Check your solution — `sqlite_stat1` should now hold a stats row for
`idx_customers_city` on `customers`.
