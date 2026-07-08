---
title: "Inserting many rows at once"
initial_sql: |
  CREATE TABLE sales (
    id INTEGER PRIMARY KEY,
    amount INTEGER
  );
desired_state:
  query: "SELECT COUNT(*) AS n, SUM(amount) AS total FROM sales;"
  rows:
    - { n: 8, total: 360 }
---

You can insert many rows with one statement by listing several tuples of values,
separated by commas:

```sql
INSERT INTO sales (amount) VALUES (10), (20), (30);
```

This is far faster than eight separate `INSERT` statements. Each standalone
`INSERT` is its own transaction with its own commit overhead; batching them into
one statement (or wrapping many in a single `BEGIN`/`COMMIT`) does that work
once instead of eight times. On large imports the difference is dramatic.

## Your task

Load eight sales in a single `INSERT` — the amounts `10, 20, 30, 40, 50, 60,
70, 80`:

```sql
INSERT INTO sales (amount) VALUES
  (10), (20), (30), (40), (50), (60), (70), (80);
```

Check your solution — there should be `8` rows totalling `360`.
