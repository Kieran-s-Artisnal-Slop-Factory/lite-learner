---
title: "Making an unsafe script re-runnable"
initial_sql: |
  CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT
  );
desired_state:
  query: "SELECT COUNT(*) AS tables FROM sqlite_master WHERE type = 'table' AND name IN ('products', 'categories');"
  rows:
    - { tables: 2 }
---

Here's a setup script from an app that only ever expected to run on a blank
database:

```sql
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE categories (id INTEGER PRIMARY KEY, name TEXT);
```

This database already has a `products` table, so running that script as-is
throws `table products already exists` on the very first line — and never
reaches the `categories` line. That's the classic bug with non-idempotent
setup.

## Your task

Rewrite both statements to be safe to re-run (add `IF NOT EXISTS` to each), so
the script runs cleanly even though `products` is already there and still
creates `categories`:

- `products` — `id INTEGER PRIMARY KEY`, `name TEXT`
- `categories` — `id INTEGER PRIMARY KEY`, `name TEXT`

Run it (twice, to be sure) and check your solution — both tables should exist.
