---
title: "Partial rollbacks with SAVEPOINT"
initial_sql: |
  CREATE TABLE accounts (
    id INTEGER PRIMARY KEY,
    name TEXT,
    balance INTEGER
  );
  INSERT INTO accounts (name, balance) VALUES
    ('Alice', 100),
    ('Bob', 50),
    ('Carol', 75);
desired_state:
  query: "SELECT name, balance FROM accounts ORDER BY name;"
  rows:
    - { name: "Alice", balance: 110 }
    - { name: "Bob", balance: 50 }
    - { name: "Carol", balance: 75 }
---

`ROLLBACK` is all-or-nothing — it undoes the *entire* transaction. A
**savepoint** is a bookmark inside a transaction that you can roll back *to*,
undoing only the work done after it while keeping everything before it.

```sql
BEGIN;
UPDATE accounts SET balance = balance + 10 WHERE name = 'Alice';  -- keep this
SAVEPOINT sp1;
UPDATE accounts SET balance = balance + 1000 WHERE name = 'Bob';  -- a mistake
ROLLBACK TO sp1;   -- undo only the Bob change; Alice's +10 survives
COMMIT;
```

After `ROLLBACK TO sp1`, the transaction is still open and Alice's raise is
intact — only the statements after the savepoint are undone. The final `COMMIT`
then saves what's left.

## Your task

Inside one transaction: give Alice a `10` raise (keep it), set a savepoint,
mistakenly add `1000` to Bob, then `ROLLBACK TO` the savepoint and `COMMIT`.

Run it and check your solution — Alice should be `110`, while Bob (`50`) and
Carol (`75`) are unchanged.
