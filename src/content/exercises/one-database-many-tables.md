---
title: "One database, many tables"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT COUNT(*) AS tables FROM sqlite_master WHERE type = 'table' AND name IN ('products', 'customers');"
  rows:
    - { tables: 2 }
---

Most databases run as a **server** — a separate program you connect to over a
network. SQLite is different: the entire database is just **one file** on disk,
and the code that reads it is a small library built right into the app. No
server to install, start, or log in to. That's why SQLite ships inside phones,
browsers, and countless apps — and why it runs happily here in your browser.

Being a single file doesn't mean a single table. One SQLite database holds as
many tables as you like, all side by side:

```sql
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
```

Both tables now live in the same database — the same file, if this were saved
to disk.

## Your task

Starting from an empty database, create two tables — `products` and
`customers` — each with an `id INTEGER PRIMARY KEY` and a `name TEXT` column.
Run your statements and check your solution.
