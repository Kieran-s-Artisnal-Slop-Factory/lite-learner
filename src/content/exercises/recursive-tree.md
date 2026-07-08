---
title: "Walking a hierarchy"
initial_sql: |
  CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT,
    manager_id INTEGER REFERENCES employees(id)
  );
  INSERT INTO employees (id, name, manager_id) VALUES
    (1, 'Ada', NULL),
    (2, 'Bo', 1),
    (3, 'Cy', 1),
    (4, 'Di', 2),
    (5, 'Eve', 4);
desired_state:
  query: "SELECT name, level FROM answer ORDER BY level, name;"
  rows:
    - { name: "Ada", level: 0 }
    - { name: "Bo", level: 1 }
    - { name: "Cy", level: 1 }
    - { name: "Di", level: 2 }
    - { name: "Eve", level: 3 }
---

Recursive CTEs shine on **hierarchies** — org charts, threaded comments, file
trees — data where a row points at its parent. The `employees` table stores each
person's `manager_id`; following those links is a job for recursion.

Start at the top (Ada, who has no manager) at level `0`, then repeatedly join
employees to the people already found, one level deeper each pass:

```sql
WITH RECURSIVE org(id, name, level) AS (
  SELECT id, name, 0 FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, org.level + 1
  FROM employees e
  JOIN org ON e.manager_id = org.id
)
SELECT name, level FROM org;
```

Each pass finds the direct reports of everyone discovered so far, tagging them
with the next `level`.

## Your task

Save every employee and their depth in the hierarchy (Ada at `0`) into `answer`,
using the recursive query above.

Check your solution — Ada is level 0, Bo and Cy level 1, Di level 2, and Eve
level 3.
