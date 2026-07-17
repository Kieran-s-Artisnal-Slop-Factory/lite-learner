---
title: "Generated columns"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT price, qty, total FROM line_items ORDER BY id;"
  rows:
    - { price: 10, qty: 3, total: 30 }
    - { price: 5, qty: 4, total: 20 }
---

A **generated column** is computed from other columns rather than stored by you.
Instead of an app calculating `price * qty` and hoping it stays consistent, the
database derives it — it can never drift out of sync.

```sql
CREATE TABLE line_items (
  id INTEGER PRIMARY KEY,
  price INTEGER,
  qty INTEGER,
  total INTEGER GENERATED ALWAYS AS (price * qty) STORED
);
```

You insert `price` and `qty`; `total` fills itself in. `STORED` saves the value
on disk (fast to read); the alternative, `VIRTUAL`, computes it on each read
(saves space). You never write to a generated column directly.

## Your task

1. Create the `line_items` table above, with `total` generated as `price * qty`.
2. Insert two rows, giving only `price` and `qty`: `(10, 3)` and `(5, 4)`.

The `total` column should populate itself.

Check your solution — the totals should compute to `30` and `20`.
