---
title: "Overwriting rows with INSERT OR REPLACE"
initial_sql: |
  CREATE TABLE stock (
    sku TEXT PRIMARY KEY,
    qty INTEGER
  );
  INSERT INTO stock (sku, qty) VALUES ('A', 5), ('B', 2);
desired_state:
  query: "SELECT sku, qty FROM stock ORDER BY sku;"
  rows:
    - { sku: "A", qty: 10 }
    - { sku: "B", qty: 2 }
    - { sku: "C", qty: 7 }
---

Where `INSERT OR IGNORE` keeps the existing row, `INSERT OR REPLACE` does the
opposite: on a conflict it **deletes the old row and inserts the new one** in
its place. New rows are still just inserted normally.

```sql
INSERT OR REPLACE INTO stock (sku, qty) VALUES ('A', 10), ('C', 7);
```

`A` exists, so its row is replaced with `qty = 10`; `C` is new and simply added.
Rows you don't mention (like `B`) are untouched.

> **Watch out:** because REPLACE *deletes then inserts*, any columns you don't
> list get reset to their defaults — it replaces the entire row, not just the
> columns you provide.

## Your task

`stock` has `A = 5` and `B = 2`. With one `INSERT OR REPLACE`, set `A` to `10`
and add `C` at `7`, leaving `B` alone:

```sql
INSERT OR REPLACE INTO stock (sku, qty) VALUES ('A', 10), ('C', 7);
```

Check your solution — `A` becomes `10`, `B` stays `2`, and `C` is `7`.
