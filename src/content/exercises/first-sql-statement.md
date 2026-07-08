---
title: "Your first SQL statements"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT message FROM hello;"
  rows:
    - { message: "Hello, world" }
---

**SQL** (Structured Query Language) is how you tell a database what to do. You
write it as **statements**, and every statement ends with a **semicolon** (`;`).
The semicolon is how SQLite knows one statement has finished and the next has
begun.

SQL keywords like `CREATE`, `INSERT`, and `SELECT` are **case-insensitive** —
`select`, `SELECT`, and `SeLeCt` all work. By convention they're written in
UPPERCASE so they stand out from your table and column names.

Here are two statements — one makes a table, the next puts a row in it:

```sql
CREATE TABLE hello (message TEXT);
INSERT INTO hello (message) VALUES ('Hello, world');
```

## Your task

The database is empty. Run both statements above so the `hello` table exists
and contains a single row whose `message` is `Hello, world`. Mind the
semicolons, then check your solution.
