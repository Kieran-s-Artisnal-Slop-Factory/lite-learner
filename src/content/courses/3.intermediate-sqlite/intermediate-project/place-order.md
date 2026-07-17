---
title: "Project: placing an order in a transaction"
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
  INSERT INTO products (sku, name, price, stock) VALUES
    ('WIDGET', 'Widget', 10, 100),
    ('GADGET', 'Gadget', 25, 40),
    ('GIZMO',  'Gizmo',  8,  0);
desired_state:
  query: "SELECT sku, stock FROM products ORDER BY sku;"
  rows:
    - { sku: "GADGET", stock: 40 }
    - { sku: "GIZMO", stock: 0 }
    - { sku: "WIDGET", stock: 85 }
---

Placing an order is really two changes that must happen together: record the
order, and decrement the product's stock. If only one landed, your books would
be wrong — stock sold but no order, or an order with no stock taken. This is a
textbook use for a **transaction**.

```sql
BEGIN;
INSERT INTO orders (product_sku, qty) VALUES ('WIDGET', 15);
UPDATE products SET stock = stock - 15 WHERE sku = 'WIDGET';
COMMIT;
```

Both statements commit as one unit — the order and the stock change are always
consistent with each other.

## Your task

A customer orders **15** of `WIDGET`. Inside a single transaction, insert the
order row and reduce `WIDGET`'s stock by `15`, then commit.

Run it and check your solution — `WIDGET` should drop to `85`, with `GADGET` and
`GIZMO` unchanged.
