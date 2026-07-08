---
title: "Project: the units-sold report"
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
    ('WIDGET', 'Widget', 10, 80),
    ('GADGET', 'Gadget', 25, 38),
    ('GIZMO',  'Gizmo',  8,  0);
  INSERT INTO orders (product_sku, qty) VALUES
    ('WIDGET', 15), ('WIDGET', 5), ('GADGET', 2);
desired_state:
  query: "SELECT name, units FROM answer ORDER BY name;"
  rows:
    - { name: "Gadget", units: 2 }
    - { name: "Widget", units: 20 }
---

Last step: the report the whole system exists to produce — **how many units of
each product have been ordered.** That means joining `orders` to `products` for
the name, then summing each product's quantities with `GROUP BY`.

```sql
SELECT p.name, SUM(o.qty) AS units
FROM products p
JOIN orders o ON o.product_sku = p.sku
GROUP BY p.sku, p.name;
```

`GIZMO` has no orders, so an inner join leaves it out entirely — the report
shows only products that have actually sold.

## Your task

Build the report and save it into `answer`: each product `name` and its total
`units` ordered.

```sql
CREATE TABLE answer AS
SELECT p.name, SUM(o.qty) AS units
FROM products p
JOIN orders o ON o.product_sku = p.sku
GROUP BY p.sku, p.name;
```

Check your solution — Gadget shows `2` units and Widget shows `20`. That's the
full intermediate system, end to end — nicely done.
