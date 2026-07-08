---
title: "Filling gaps with DEFAULT values"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT title, done FROM tasks ORDER BY title;"
  rows:
    - { title: "Buy milk", done: 0 }
    - { title: "Walk dog", done: 0 }
---

A column can carry a **default value** — what SQLite fills in when an `INSERT`
doesn't mention that column. Defaults are perfect for fields that almost always
start the same way, like a "done" flag that begins as `0` (not done):

```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY,
  title TEXT,
  done INTEGER DEFAULT 0
);
```

Now inserting a task without a `done` value gets `0` automatically:

```sql
INSERT INTO tasks (title) VALUES ('Buy milk');
```

## Your task

1. Create the `tasks` table above, with `done` defaulting to `0`.
2. Insert two tasks, giving only their titles: `Buy milk` and `Walk dog`.

Because you leave `done` out, both rows should come back with `done = 0`. Run it
and check your solution.
