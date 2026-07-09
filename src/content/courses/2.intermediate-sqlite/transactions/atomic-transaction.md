---
title: "All-or-nothing with BEGIN and COMMIT"
initial_sql: |
  CREATE TABLE accounts (
    id INTEGER PRIMARY KEY,
    name TEXT,
    balance INTEGER
  );
  INSERT INTO accounts (name, balance) VALUES
    ('Alice', 100),
    ('Bob', 50);
desired_state:
  query: "SELECT name, balance FROM accounts ORDER BY name;"
  rows:
    - { name: "Alice", balance: 70 }
    - { name: "Bob", balance: 80 }
---

Some operations only make sense as a whole. Transferring money is two updates —
subtract from one account, add to another — and if only the first runs, money
vanishes. A **transaction** bundles statements so they all succeed together or
none of them do. This all-or-nothing property is called **atomicity**.

`BEGIN` opens a transaction; `COMMIT` makes every change inside it permanent, as
one indivisible step:

```sql
BEGIN;
UPDATE accounts SET balance = balance - 30 WHERE name = 'Alice';
UPDATE accounts SET balance = balance + 30 WHERE name = 'Bob';
COMMIT;
```

Until you `COMMIT`, the changes are provisional. If anything failed partway, you
could `ROLLBACK` instead (next exercise) and it'd be as if nothing happened.

## Your task

Transfer `30` from Alice to Bob inside a single transaction: subtract `30` from
Alice, add `30` to Bob, wrapped in `BEGIN` … `COMMIT`.

Run it and check your solution — Alice ends at `70`, Bob at `80`.
