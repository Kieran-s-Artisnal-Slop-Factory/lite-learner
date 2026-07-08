---
title: "Syncing inventory with an upsert"
initial_sql: |
  CREATE TABLE products (
    sku TEXT PRIMARY KEY,
    name TEXT,
    qty INTEGER
  );
  INSERT INTO products (sku, name, qty) VALUES
    ('A', 'Apple', 5),
    ('B', 'Banana', 2);
desired_state:
  query: "SELECT sku, name, qty FROM products ORDER BY sku;"
  rows:
    - { sku: "A", name: "Apple", qty: 12 }
    - { sku: "B", name: "Banana", qty: 2 }
    - { sku: "C", name: "Cherry", qty: 7 }
---

A common real-world job: you receive a fresh feed of product data and need to
**sync** it in — update products you already have, insert ones you don't, all in
one statement. That's exactly what an upsert with multiple `SET` columns does.

You can update several columns at once from the `excluded` row:

```sql
INSERT INTO products (sku, name, qty) VALUES (...)
ON CONFLICT(sku) DO UPDATE SET
  name = excluded.name,
  qty  = excluded.qty;
```

Unlike the running-total example, here the incoming values **overwrite** the
stored ones — the feed is the source of truth.

## Your task

The catalogue has `A` (Apple, 5) and `B` (Banana, 2). A supplier feed arrives
with two rows: `('A', 'Apple', 12)` and `('C', 'Cherry', 7)`. Sync it so that
`A`'s quantity becomes `12`, `C` is added, and `B` (not in the feed) is left
alone:

```sql
INSERT INTO products (sku, name, qty) VALUES ('A', 'Apple', 12), ('C', 'Cherry', 7)
ON CONFLICT(sku) DO UPDATE SET
  name = excluded.name,
  qty  = excluded.qty;
```

Check your solution — `A` = 12, `B` = 2, `C` = 7.
