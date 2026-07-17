---
title: "Speeding up lookups with an index"
initial_sql: |
  CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    email TEXT,
    city TEXT
  );
  INSERT INTO customers (email, city) VALUES
    ('ana@example.com', 'Toronto'),
    ('ben@example.com', 'Halifax'),
    ('cy@example.com', 'Toronto'),
    ('di@example.com', 'Calgary');
desired_state:
  query: "SELECT name FROM sqlite_master WHERE type = 'index' AND name NOT LIKE 'sqlite_%' ORDER BY name;"
  rows:
    - { name: "idx_customers_city" }
---

To find customers in a given city, SQLite normally reads *every* row and checks
each one — a **full table scan**. On a big table that's slow. An **index** is a
sorted lookup structure on a column; with one in place, SQLite jumps straight to
the matching rows instead of scanning.

```sql
CREATE INDEX idx_customers_city ON customers(city);
```

The name is yours to choose; a common convention is `idx_<table>_<column>`.
Indexes speed up reads that filter or sort on the indexed column — at the cost
of a little extra storage and slightly slower writes (each write must update the
index too).

## Your task

Create an index named `idx_customers_city` on the `city` column of `customers`:

```sql
CREATE INDEX idx_customers_city ON customers(city);
```

Run it and check your solution — the index should exist on the table.
