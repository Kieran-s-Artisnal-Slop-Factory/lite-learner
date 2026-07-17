---
title: "Fixing broken SQL"
initial_sql: |
  CREATE TABLE fruits (
    id INTEGER PRIMARY KEY,
    name TEXT
  );
desired_state:
  query: "SELECT name FROM fruits ORDER BY name;"
  rows:
    - { name: "apple" }
---

Reading error messages and fixing broken statements is a big part of working
with any database. The statement below is *supposed* to add the fruit `apple`
to the `fruits` table, but it has two mistakes:

```sql
INSERT INTO fruits (name) VALUE (apple);
```

Run it as-is and read the error. Two things are wrong:

1. The keyword is `VALUES`, not `VALUE`.
2. `apple` is text, so it must be wrapped in **single quotes** — without them,
   SQLite thinks `apple` is a column name and can't find it.

## Your task

Fix both mistakes so the statement inserts a fruit named `apple`, then run it
and check your solution.
