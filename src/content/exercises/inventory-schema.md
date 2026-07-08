---
title: "Project: an inventory schema with constraints"
initial_sql: |
  -- The database starts empty.
desired_state:
  query: "SELECT name, \"notnull\" AS nn, dflt_value FROM pragma_table_info('products') ORDER BY cid;"
  rows:
    - { name: "sku", nn: 1, dflt_value: null }
    - { name: "name", nn: 1, dflt_value: null }
    - { name: "price", nn: 1, dflt_value: null }
    - { name: "stock", nn: 1, dflt_value: "0" }
---

Over the next five exercises you'll build an inventory-and-orders system, using
everything from this course. First, the schema — and this time, with real
constraints guarding the data.

Two tables:

- **`products`** — identified by a text `sku`. Names and prices are required,
  prices can't be negative, and stock starts at zero.
- **`orders`** — each references a product and records a positive quantity.

## Your task

Create both tables. Here's `orders`; write `products` to match the rules above:

```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  product_sku TEXT REFERENCES products(sku),
  qty INTEGER NOT NULL CHECK (qty > 0)
);
```

For `products`, use these columns:

1. `sku` — `TEXT PRIMARY KEY NOT NULL`
2. `name` — `TEXT NOT NULL`
3. `price` — `INTEGER NOT NULL CHECK (price >= 0)`
4. `stock` — `INTEGER NOT NULL DEFAULT 0`

Run it and check your solution — the check inspects the `products` columns, their
`NOT NULL` flags, and the `stock` default.
