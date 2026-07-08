---
title: "Project: seeding stock with an upsert"
initial_sql: |
  CREATE TABLE products (
    sku TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    price INTEGER NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    product_sku TEXT REFERENCES products(sku),
    qty INTEGER NOT NULL CHECK (qty > 0)
  );
desired_state:
  query: "SELECT sku, name, price, stock FROM products ORDER BY sku;"
  rows:
    - { sku: "GADGET", name: "Gadget", price: 25, stock: 40 }
    - { sku: "GIZMO", name: "Gizmo", price: 8, stock: 0 }
    - { sku: "WIDGET", name: "Widget", price: 10, stock: 100 }
---

The tables are ready; now stock the catalogue. A good seed script is idempotent —
safe to re-run without creating duplicates or errors — so we'll load the
products with an **upsert** rather than a plain `INSERT`. Re-running it then just
refreshes the same rows instead of failing on the existing primary keys.

## Your task

Load these three products with a single upsert that updates `name`, `price`, and
`stock` on conflict:

| sku    | name   | price | stock |
| ------ | ------ | ----- | ----- |
| WIDGET | Widget | 10    | 100   |
| GADGET | Gadget | 25    | 40    |
| GIZMO  | Gizmo  | 8     | 0     |

```sql
INSERT INTO products (sku, name, price, stock) VALUES
  ('WIDGET', 'Widget', 10, 100),
  ('GADGET', 'Gadget', 25, 40),
  ('GIZMO',  'Gizmo',  8,  0)
ON CONFLICT(sku) DO UPDATE SET
  name  = excluded.name,
  price = excluded.price,
  stock = excluded.stock;
```

Run it (twice, to prove it's re-runnable) and check your solution.
