---
title: "Tuning the page cache"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "PRAGMA cache_size;"
  rows:
    - { cache_size: -8000 }
---

SQLite keeps recently-used database pages in an in-memory **cache** so repeat
reads don't hit the disk. A bigger cache means fewer disk reads on a busy
database — a simple, effective performance knob.

`PRAGMA cache_size` sets it, and the sign of the number matters:

- a **positive** value is a number of *pages* (`PRAGMA cache_size = 2000;`)
- a **negative** value is an amount of *memory in kibibytes*
  (`PRAGMA cache_size = -8000;` ≈ 8 MB), which is usually the clearer way to ask

```sql
PRAGMA cache_size = -8000;   -- roughly 8 MB of page cache
```

## Your task

Set this connection's cache size to `-8000` (about 8 MB):

```sql
PRAGMA cache_size = -8000;
```

Run it and check your solution — the cache size should read back as `-8000`.
