---
title: "Reading and setting PRAGMAs"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "PRAGMA user_version;"
  rows:
    - { user_version: 5 }
---

A **PRAGMA** is a special SQLite statement for reading or changing database
settings — SQLite's control panel. Used with no value, a PRAGMA *reads* a
setting; used with `= value`, it *sets* one.

```sql
PRAGMA user_version;       -- read it (starts at 0)
PRAGMA user_version = 5;   -- set it
```

`user_version` is a free integer slot SQLite stores in the database header and
otherwise ignores — apps use it to track their own schema version, bumping it
each time they migrate. It's a perfect first PRAGMA because, unlike most, its
value is stored in the database itself.

## Your task

Set this database's `user_version` to `5`:

```sql
PRAGMA user_version = 5;
```

Run it and check your solution — reading `user_version` back should return `5`.
