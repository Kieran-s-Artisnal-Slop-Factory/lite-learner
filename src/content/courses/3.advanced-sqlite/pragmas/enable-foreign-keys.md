---
title: "Turning on foreign-key enforcement"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "PRAGMA foreign_keys;"
  rows:
    - { foreign_keys: 1 }
---

Here's a surprise that catches many people out: SQLite defines foreign keys but
does **not enforce** them by default. For historical compatibility, enforcement
is off until you switch it on — per connection — with a PRAGMA:

```sql
PRAGMA foreign_keys = ON;
```

With it off, you can insert a `book` pointing at an `author_id` that doesn't
exist. With it on, that insert is rejected. Because it's a *runtime* setting
tied to the connection (not stored in the database file), an app must set it
every time it connects.

`PRAGMA foreign_keys;` reads the current state back as `1` (on) or `0` (off).

## Your task

Enable foreign-key enforcement on this connection:

```sql
PRAGMA foreign_keys = ON;
```

Run it and check your solution — the setting should read back as `1`.
