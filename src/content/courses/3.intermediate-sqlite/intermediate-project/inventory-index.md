---
title: "Project: indexing for the report"
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
    ('WIDGET', 'Widget', 10, 85),
    ('GADGET', 'Gadget', 25, 40),
    ('GIZMO',  'Gizmo',  8,  0);
  INSERT INTO orders (product_sku, qty) VALUES
    ('WIDGET', 15), ('WIDGET', 5), ('GADGET', 2);
desired_state:
  query: "SELECT name FROM sqlite_master WHERE type = 'index' AND name NOT LIKE 'sqlite_%' ORDER BY name;"
  rows:
    - { name: "idx_orders_product_sku" }
---

The report you're about to build groups orders by product, joining `orders` to
`products` on `product_sku`. That join — and any lookup of "all orders for this
product" — reads `orders.product_sku`. It's a foreign-key column you filter and
join on, which makes it a prime index candidate.

Check the report query's plan first if you like:

```sql
EXPLAIN QUERY PLAN
SELECT p.name, SUM(o.qty)
FROM products p
JOIN orders o ON o.product_sku = p.sku
GROUP BY p.sku;
```

Then add the index that supports it.

## Your task

Create an index named `idx_orders_product_sku` on `orders(product_sku)`:

```sql
CREATE INDEX idx_orders_product_sku ON orders(product_sku);
```

Run it and check your solution — the index should exist.
