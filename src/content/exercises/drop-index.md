---
title: "Removing an index that isn't earning its keep"
initial_sql: |
  CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    email TEXT,
    city TEXT
  );
  CREATE INDEX idx_customers_email ON customers(email);
  INSERT INTO customers (email, city) VALUES
    ('ana@example.com', 'Toronto'),
    ('ben@example.com', 'Halifax');
desired_state:
  query: "SELECT COUNT(*) AS index_count FROM sqlite_master WHERE type = 'index' AND name NOT LIKE 'sqlite_%';"
  rows:
    - { index_count: 0 }
---

Indexes aren't free. Every one costs storage and makes `INSERT`, `UPDATE`, and
`DELETE` a little slower, because each write has to maintain the index too. So an
index that no query actually uses is pure overhead — worth dropping.

```sql
DROP INDEX idx_customers_email;
```

When *not* to index, in short: tiny tables (a scan is already instant), columns
you never filter or sort by, and columns with very few distinct values (like a
boolean) where an index barely narrows anything down.

## Your task

This table has an `idx_customers_email` index that no query uses. Drop it:

```sql
DROP INDEX idx_customers_email;
```

Run it and check your solution — no user-created indexes should remain.
