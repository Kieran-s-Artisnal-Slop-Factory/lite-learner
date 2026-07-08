---
title: "Documenting SQL with comments"
initial_sql: |
  CREATE TABLE todo (
    id INTEGER PRIMARY KEY,
    task TEXT
  );
desired_state:
  query: "SELECT task FROM todo;"
  rows:
    - { task: "Learn SQL" }
---

**Comments** are notes for humans; SQLite ignores them entirely. They're how
you explain *why* a piece of SQL exists. There are two styles:

```sql
-- A line comment: everything after the two dashes is ignored.

/* A block comment:
   it can span multiple lines. */
```

Comments can sit on their own line or trail the end of a statement:

```sql
INSERT INTO todo (task) VALUES ('Learn SQL');  -- my first task
```

Because they're ignored, a comment never changes what the database does — it's
purely documentation.

## Your task

The `todo` table is empty. Insert one row whose `task` is `Learn SQL`, and
include at least one comment in your SQL (any style). Run it and check your
solution — the comment won't affect the result, which is exactly the point.
