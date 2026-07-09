---
title: "Skipping duplicates with INSERT OR IGNORE"
initial_sql: |
  CREATE TABLE stock (
    sku TEXT PRIMARY KEY,
    qty INTEGER
  );
  INSERT INTO stock (sku, qty) VALUES ('A', 5);
desired_state:
  query: "SELECT sku, qty FROM stock ORDER BY sku;"
  rows:
    - { sku: "A", qty: 5 }
    - { sku: "B", qty: 3 }
    - { sku: "C", qty: 7 }
---

Normally, inserting a row whose primary key already exists is an error that
aborts the whole statement. `INSERT OR IGNORE` changes that: rows that would
violate a `PRIMARY KEY` or `UNIQUE` constraint are silently skipped, and the
rest go in.

That makes it ideal for "add these if they're new" — existing rows are left
exactly as they are.

```sql
INSERT OR IGNORE INTO stock (sku, qty) VALUES ('A', 99), ('B', 3);
```

Here `A` already exists, so its row is untouched (it keeps `qty = 5`, *not*
`99`); `B` is new, so it's inserted.

## Your task

`stock` already has SKU `A` with `qty = 5`. Using a single `INSERT OR IGNORE`,
try to add three rows — `('A', 99)`, `('B', 3)`, `('C', 7)` — so that the
existing `A` is preserved and `B` and `C` are added:

```sql
INSERT OR IGNORE INTO stock (sku, qty) VALUES ('A', 99), ('B', 3), ('C', 7);
```

Check your solution — `A` should still be `5`, with `B` and `C` added.
