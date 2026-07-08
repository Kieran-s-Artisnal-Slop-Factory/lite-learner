---
title: "Generating rows with a recursive CTE"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT n FROM answer ORDER BY n;"
  rows:
    - { n: 1 }
    - { n: 2 }
    - { n: 3 }
    - { n: 4 }
    - { n: 5 }
---

A **recursive CTE** refers to itself, letting SQL do something it otherwise
can't: loop. It has two parts joined by `UNION ALL` — a starting row (the *base
case*), and a rule that derives the next row from the current one (the
*recursive step*), which repeats until it produces nothing new.

This one counts from 1 to 5:

```sql
WITH RECURSIVE nums(n) AS (
  SELECT 1                       -- base case: start at 1
  UNION ALL
  SELECT n + 1 FROM nums WHERE n < 5   -- step: add 1 until we reach 5
)
SELECT n FROM nums;
```

The `WHERE n < 5` is the stop condition — without it the recursion would never
end. Generating a series of numbers or dates like this is a classic use.

## Your task

Use a recursive CTE to generate the numbers `1` through `5` and save them into
`answer`:

```sql
CREATE TABLE answer AS
WITH RECURSIVE nums(n) AS (
  SELECT 1
  UNION ALL
  SELECT n + 1 FROM nums WHERE n < 5
)
SELECT n FROM nums;
```

Check your solution — you should get the numbers 1 through 5.
