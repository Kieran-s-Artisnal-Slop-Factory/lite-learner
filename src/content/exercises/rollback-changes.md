---
title: "Undoing work with ROLLBACK"
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
    - { name: "Alice", balance: 100 }
    - { name: "Bob", balance: 50 }
---

`ROLLBACK` is the escape hatch: it throws away every change made since `BEGIN`,
restoring the database to how it looked before the transaction started. It's
what you reach for when something goes wrong midway, or when you just want to
try something out without committing to it.

```sql
BEGIN;
UPDATE accounts SET balance = 0;   -- oops, that would wipe everyone out
ROLLBACK;                          -- undo it — balances are back
```

After the `ROLLBACK`, it's as if the `UPDATE` never ran. (Compare this with
`COMMIT`: had you committed instead, the zeros would be permanent.)

## Your task

Practise a rollback. Inside a transaction, set **every** account's `balance` to
`0`, then `ROLLBACK` so the original balances are restored:

```sql
BEGIN;
UPDATE accounts SET balance = 0;
ROLLBACK;
```

Run it and check your solution — Alice should be back at `100` and Bob at `50`.
(If you had used `COMMIT` here instead, the check would fail — that's the whole
difference.)
