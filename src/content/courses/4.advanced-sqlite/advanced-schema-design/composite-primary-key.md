---
title: "Composite primary keys"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT name, pk FROM pragma_table_info('enrollments') WHERE pk > 0 ORDER BY pk;"
  rows:
    - { name: "student_id", pk: 1 }
    - { name: "course_id", pk: 2 }
---

Sometimes no single column identifies a row, but a **combination** does. A
join/link table for a many-to-many relationship is the classic case: a student
enrols in a course, and it's the *pair* `(student_id, course_id)` that must be
unique — a student shouldn't enrol in the same course twice.

Declare a **composite primary key** by listing the columns in a table-level
`PRIMARY KEY` clause:

```sql
CREATE TABLE enrollments (
  student_id INTEGER,
  course_id INTEGER,
  grade TEXT,
  PRIMARY KEY (student_id, course_id)
);
```

The order matters — the key is sorted by `student_id` first, then `course_id`.
`pragma_table_info` marks the key members with `pk = 1` and `pk = 2`.

## Your task

Create the `enrollments` table above, with a composite primary key of
`(student_id, course_id)` in that order.

Check your solution — `student_id` should be `pk` 1 and `course_id` `pk` 2.
