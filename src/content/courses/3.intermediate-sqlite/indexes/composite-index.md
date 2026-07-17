---
title: "Indexing multiple columns"
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
  query: "SELECT name FROM pragma_index_info('idx_customers_city_email') ORDER BY seqno;"
  rows:
    - { name: "city" }
    - { name: "email" }
---

An index can cover **several columns** at once. A composite index is sorted by
the first column, then the second within that, and so on — so it's ideal for
queries that filter on those columns together:

```sql
CREATE INDEX idx_customers_city_email ON customers(city, email);
```

**Column order matters.** This index helps queries that filter on `city` alone,
or on `city` *and* `email` — but not ones that filter on `email` alone, because
the index is sorted by city first. Put the column you filter on most (or by
equality) first.

## Your task

Create a composite index named `idx_customers_city_email` on `customers`,
covering `city` **then** `email` (in that order):

```sql
CREATE INDEX idx_customers_city_email ON customers(city, email);
```

Run it and check your solution — the index should cover `city` and `email`, in
that order.
