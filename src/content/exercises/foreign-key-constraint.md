---
title: "Linking tables with FOREIGN KEY"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT \"table\" AS ref_table, \"from\" AS from_col, \"to\" AS to_col FROM pragma_foreign_key_list('books');"
  rows:
    - { ref_table: "authors", from_col: "author_id", to_col: "id" }
---

A `FOREIGN KEY` ties a column to a row in another table — a book's `author_id`
must match some author's `id`. Declared with `REFERENCES`, it documents the
relationship and, when enforcement is on, blocks orphaned rows that point at a
missing parent.

```sql
CREATE TABLE authors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author_id INTEGER REFERENCES authors(id)
);
```

> **Note:** SQLite has foreign-key *enforcement* switched **off** by default for
> backwards compatibility. You turn it on per connection with
> `PRAGMA foreign_keys = ON;`. The `REFERENCES` clause still defines the
> relationship either way.

## Your task

Create both tables above so that `books.author_id` references `authors.id`.

Run it and check your solution — the check reads the foreign key you declared on
`books`.
