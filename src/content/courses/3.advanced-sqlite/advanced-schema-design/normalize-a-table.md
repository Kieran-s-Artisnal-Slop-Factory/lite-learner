---
title: "Normalizing a table"
initial_sql: |
  CREATE TABLE orders_flat (
    id INTEGER PRIMARY KEY,
    customer_name TEXT,
    total INTEGER
  );
  INSERT INTO orders_flat (customer_name, total) VALUES
    ('Ada', 50),
    ('Bo', 80),
    ('Ada', 30);
desired_state:
  query: "SELECT c.name, SUM(o.total) AS total FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.id, c.name ORDER BY c.name;"
  rows:
    - { name: "Ada", total: 80 }
    - { name: "Bo", total: 80 }
---

**Normalization** removes duplication by splitting repeated data into its own
table. The `orders_flat` table repeats `customer_name` on every order — so a
customer's name is stored many times, and renaming them means editing every row.

The fix: one row per customer in a `customers` table, and orders that reference
it by `id`.

```sql
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders   (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER);
```

Now each name is stored once, and orders link to it — the relational way.

## Your task

Normalize `orders_flat` into the two tables above:

1. Create `customers` and `orders`.
2. Insert **each distinct customer once** (Ada, Bo) into `customers`.
3. Insert the three orders into `orders`, each pointing at the right
   `customer_id`.

For example:

```sql
INSERT INTO customers (id, name) VALUES (1, 'Ada'), (2, 'Bo');
INSERT INTO orders (customer_id, total) VALUES (1, 50), (2, 80), (1, 30);
```

Check your solution — joining the normalized tables should total Ada at 80 and
Bo at 80.
