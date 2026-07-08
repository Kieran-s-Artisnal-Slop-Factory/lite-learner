---
title: "Enforcing rules with CHECK"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT 1 AS ok FROM sqlite_master WHERE type = 'table' AND name = 'orders' AND sql LIKE '%CHECK%';"
  rows:
    - { ok: 1 }
---

`NOT NULL` and `UNIQUE` cover common rules; `CHECK` lets you write your own. It
takes any boolean expression, and a row is only allowed if that expression is
true. This is how you stop nonsensical values — a negative quantity, a rating
above 10 — from ever being stored.

```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  quantity INTEGER NOT NULL CHECK (quantity > 0)
);
```

With this in place, `INSERT INTO orders (quantity) VALUES (0);` is rejected —
the database refuses to hold an order for zero items. Try it after you build the
table.

## Your task

Create the `orders` table above, with a `CHECK` that keeps `quantity` greater
than `0`. Then, as an experiment, try inserting a row with `quantity = 0` and
watch it get rejected.

Run it and check your solution — the check verifies your table defines a
`CHECK` constraint.
