---
title: "True upserts with ON CONFLICT DO UPDATE"
initial_sql: |
  CREATE TABLE stock (
    sku TEXT PRIMARY KEY,
    qty INTEGER
  );
  INSERT INTO stock (sku, qty) VALUES ('A', 5);
desired_state:
  query: "SELECT sku, qty FROM stock ORDER BY sku;"
  rows:
    - { sku: "A", qty: 15 }
    - { sku: "B", qty: 3 }
---

`OR IGNORE` and `OR REPLACE` are blunt — you either keep the old row or blow it
away. An **upsert** (`ON CONFLICT ... DO UPDATE`) is precise: on a conflict it
runs an `UPDATE` you define, and the special `excluded` table refers to the row
you *tried* to insert.

That lets you combine old and new values — perfect for "add this delivery to the
existing quantity":

```sql
INSERT INTO stock (sku, qty) VALUES ('A', 10)
ON CONFLICT(sku) DO UPDATE SET qty = qty + excluded.qty;
```

`A` exists, so instead of failing it updates: `qty` (5) `+ excluded.qty` (10)
`= 15`. A brand-new SKU in the same statement is just inserted.

## Your task

A delivery arrives: `10` more of `A` and `3` of the new SKU `B`. With one
upsert, **add** the delivered amounts — `A` should become `15` (its `5` plus
`10`) and `B` should be inserted at `3`:

```sql
INSERT INTO stock (sku, qty) VALUES ('A', 10), ('B', 3)
ON CONFLICT(sku) DO UPDATE SET qty = qty + excluded.qty;
```

Check your solution — `A` is `15` and `B` is `3`.
