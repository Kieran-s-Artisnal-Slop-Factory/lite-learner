---
title: "Fixing a slow lookup"
initial_sql: |
  CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    name TEXT,
    city TEXT
  );
  INSERT INTO customers (name, city) VALUES
    ('Ana', 'Toronto'),
    ('Ben', 'Halifax'),
    ('Cy', 'Toronto'),
    ('Di', 'Calgary'),
    ('Eve', 'Montreal');
desired_state:
  query: "SELECT name FROM sqlite_master WHERE type = 'index' AND name NOT LIKE 'sqlite_%' ORDER BY name;"
  rows:
    - { name: "idx_customers_name" }
---

Your app looks customers up by name all day long:

```sql
SELECT * FROM customers WHERE name = 'Cy';
```

Check its plan first:

```sql
EXPLAIN QUERY PLAN
SELECT * FROM customers WHERE name = 'Cy';
```

It reports `SCAN customers` — every row read to find one. Since `name` is the
column being filtered, that's the column to index. A single-column index turns
the scan into a direct `SEARCH`.

## Your task

Diagnose the slow lookup with `EXPLAIN QUERY PLAN`, then create an index named
`idx_customers_name` on the `name` column so the query can use it:

```sql
CREATE INDEX idx_customers_name ON customers(name);
```

Re-run the plan to confirm it now `SEARCH`es the index, then check your
solution.
