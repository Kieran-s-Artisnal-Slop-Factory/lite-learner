---
title: "Checking database integrity"
initial_sql: |
  CREATE TABLE ledger (
    id INTEGER PRIMARY KEY,
    entry TEXT
  );
  INSERT INTO ledger (entry) VALUES ('opening balance'), ('deposit');
desired_state:
  query: "SELECT result FROM answer;"
  rows:
    - { result: "ok" }
---

`PRAGMA integrity_check` verifies that the database's internal structure is
sound — every page, index, and pointer consistent. On a healthy database it
returns a single row: the text `ok`. On a corrupt one it lists the problems it
found. It's the first thing to run if you suspect a file is damaged.

```sql
PRAGMA integrity_check;
```

You can capture its result into a table for inspection. Create the table first,
then fill it — that keeps the check from tripping over a half-built table:

```sql
CREATE TABLE answer (result TEXT);
INSERT INTO answer SELECT * FROM pragma_integrity_check();
```

## Your task

Run the integrity check on this database and store its result in an `answer`
table, using the two-statement form above.

Check your solution — a healthy database reports `ok`.
