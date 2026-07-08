---
title: "Running several statements at once"
initial_sql: |
  CREATE TABLE numbers (n INTEGER);
desired_state:
  query: "SELECT n FROM numbers ORDER BY n;"
  rows:
    - { n: 1 }
    - { n: 2 }
    - { n: 3 }
---

You can run many statements in one go — the editor sends them to SQLite in
order, and the semicolon between each one keeps them separate. Leave a
semicolon out and SQLite reads two statements as one run-on, which usually
errors.

The `numbers` table already exists (with one column, `n`) but is empty. Here
are three separate `INSERT` statements:

```sql
INSERT INTO numbers (n) VALUES (1);
INSERT INTO numbers (n) VALUES (2);
INSERT INTO numbers (n) VALUES (3);
```

Whitespace and line breaks don't matter to SQLite — only the semicolons do. You
could even write all three on one line.

## Your task

Insert the numbers `1`, `2`, and `3` into the `numbers` table, each with its own
`INSERT` statement. Run all three, then check your solution.
