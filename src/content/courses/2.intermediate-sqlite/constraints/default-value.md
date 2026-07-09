---
title: "Auto-filling columns with DEFAULT"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT name, dflt_value FROM pragma_table_info('posts') ORDER BY cid;"
  rows:
    - { name: "id", dflt_value: null }
    - { name: "title", dflt_value: null }
    - { name: "views", dflt_value: "0" }
    - { name: "created_at", dflt_value: "CURRENT_TIMESTAMP" }
---

A `DEFAULT` supplies a value when an `INSERT` doesn't provide one — great for
counters that start at zero or a "created" timestamp that should fill itself in.
The special expression `CURRENT_TIMESTAMP` records the moment the row was
inserted.

```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  title TEXT,
  views INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

Now `INSERT INTO posts (title) VALUES ('Hello');` stores `views = 0` and a fresh
`created_at` automatically. `pragma_table_info` reports each column's declared
default in its `dflt_value`.

## Your task

Create the `posts` table above, with `views` defaulting to `0` and `created_at`
defaulting to `CURRENT_TIMESTAMP`.

Run it and check your solution — the two defaults should show up in the column
metadata.
