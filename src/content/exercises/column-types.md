---
title: "Choosing column types"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT name, type, pk FROM pragma_table_info('products') ORDER BY cid;"
  rows:
    - { name: "id", type: "INTEGER", pk: 1 }
    - { name: "name", type: "TEXT", pk: 0 }
    - { name: "price", type: "REAL", pk: 0 }
    - { name: "in_stock", type: "INTEGER", pk: 0 }
---

When you declare a column you give it a **type**, which signals what kind of
value it holds. SQLite's core types are:

- `INTEGER` — whole numbers (`42`, `-7`)
- `REAL` — numbers with a decimal point (`9.99`, `3.14`)
- `TEXT` — strings (`'hello'`)
- `BLOB` — raw bytes
- (a column with no type declared can hold anything)

Picking the right type keeps your data sensible — a `price` should be `REAL`, a
`name` should be `TEXT`.

```sql
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT,
  pages INTEGER,
  price REAL
);
```

## Your task

Create a table called `products` with these columns, in this order:

1. `id` — `INTEGER PRIMARY KEY`
2. `name` — `TEXT`
3. `price` — `REAL`
4. `in_stock` — `INTEGER`

Run it and check your solution.
