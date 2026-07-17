---
title: "Handling contention with busy_timeout"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "PRAGMA busy_timeout;"
  rows:
    - { timeout: 5000 }
---

Even in WAL mode, only **one writer** can hold the database at a time. If a
second connection tries to write while another is mid-transaction, it gets a
`SQLITE_BUSY` error. Rather than fail instantly, you can tell SQLite to wait and
retry for a while:

```sql
PRAGMA busy_timeout = 5000;   -- wait up to 5000 ms for the lock
```

With a busy timeout set, a blocked writer keeps retrying for up to that many
milliseconds before giving up — smoothing over the brief moments when two
connections collide. It's one of the first settings you tune on a busy
multi-connection database.

Reading `PRAGMA busy_timeout` returns the current value (its result column is
named `timeout`).

## Your task

Set this connection's busy timeout to `5000` milliseconds:

```sql
PRAGMA busy_timeout = 5000;
```

Run it and check your solution — the timeout should read back as `5000`.
