---
title: "Replacing duplicated SQL with a view"
initial_sql: |
  CREATE TABLE sales (
    id INTEGER PRIMARY KEY,
    product TEXT,
    category TEXT,
    amount INTEGER
  );
  INSERT INTO sales (product, category, amount) VALUES
    ('Laptop', 'Electronics', 1200),
    ('Phone', 'Electronics', 800),
    ('Monitor', 'Electronics', 300),
    ('Novel', 'Books', 15),
    ('Textbook', 'Books', 80),
    ('Comic', 'Books', 10),
    ('Blocks', 'Toys', 25),
    ('Doll', 'Toys', 30);
desired_state:
  query: "SELECT product FROM answer ORDER BY product;"
  rows:
    - { product: "Comic" }
    - { product: "Novel" }
    - { product: "Textbook" }
---

The real payoff of views is **not repeating yourself.** If several queries all
carry the same `WHERE category = 'Books'` filter (or the same five-table join),
that logic is duplicated in every one — change the rule and you must edit them
all. Capture it once in a view, and every query builds on the single definition.

```sql
CREATE VIEW book_sales AS
SELECT product, amount FROM sales WHERE category = 'Books';
```

From now on, "the book sales" is just `book_sales` — no repeated filter.

## Your task

1. Create a view `book_sales` selecting the `product` and `amount` of every sale
   in the `Books` category.
2. Using that view, save the book product names into `answer`:

```sql
CREATE TABLE answer AS SELECT product FROM book_sales;
```

Check your solution — Comic, Novel, and Textbook are the books.
