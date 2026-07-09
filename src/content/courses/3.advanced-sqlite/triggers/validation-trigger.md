---
title: "Rejecting bad data with a BEFORE trigger"
initial_sql: |
  CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    qty INTEGER
  );
desired_state:
  query: "SELECT qty FROM orders ORDER BY qty;"
  rows:
    - { qty: 3 }
    - { qty: 5 }
---

When a rule is too complex for a `CHECK` constraint, a `BEFORE` trigger can
validate a row and abort the write. `RAISE(ABORT, ...)` cancels the statement
and rolls back that row's change with an error message.

```sql
CREATE TRIGGER reject_bad_qty
BEFORE INSERT ON orders
WHEN NEW.qty <= 0
BEGIN
  SELECT RAISE(ABORT, 'qty must be positive');
END;
```

The `WHEN` clause means the trigger body only runs for offending rows; valid
inserts pass straight through.

## Your task

1. Create the `reject_bad_qty` trigger above.
2. Insert two valid orders, with `qty` `5` and `3`.
3. As an experiment, try inserting an order with `qty = 0` on its own — it
   should be rejected with the error.

Check your solution — only the two valid orders (`3` and `5`) should be stored.
