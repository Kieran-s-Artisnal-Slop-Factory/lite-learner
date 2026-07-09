---
title: "Project: designing the schema"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT name, type, pk FROM pragma_table_info('books') ORDER BY cid;"
  rows:
    - { name: "id", type: "INTEGER", pk: 1 }
    - { name: "title", type: "TEXT", pk: 0 }
    - { name: "author_id", type: "INTEGER", pk: 0 }
    - { name: "year", type: "INTEGER", pk: 0 }
    - { name: "available", type: "INTEGER", pk: 0 }
---

Time to build a small database of your own: a library catalogue. It has two
related tables — `authors`, and `books` that point back at their author. Over
the next few exercises you'll create it, fill it, lend a book out, and report on
it.

Good schema design is where every database starts. Each book links to its
author through an `author_id` foreign key, and each book tracks whether it's
`available` — defaulting to `1` (on the shelf) since new books start available.

## Your task

Starting from an empty database, create two tables:

**`authors`**

1. `id` — `INTEGER PRIMARY KEY`
2. `name` — `TEXT`

**`books`**

1. `id` — `INTEGER PRIMARY KEY`
2. `title` — `TEXT`
3. `author_id` — `INTEGER` (references `authors.id`)
4. `year` — `INTEGER`
5. `available` — `INTEGER`, defaulting to `1`

Here's the `authors` table to get you started:

```sql
CREATE TABLE authors (
  id INTEGER PRIMARY KEY,
  name TEXT
);
```

Write the `books` table yourself, then check your solution. The check inspects
the `books` table's columns.
