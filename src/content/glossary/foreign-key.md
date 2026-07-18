---
term: Foreign key
short: A column that references the primary key of another table, linking rows together and enforcing that the referenced row exists.
---

A **foreign key** is a column whose values must match a [[primary-key]] in
another [[table]]. It is how relational databases wire tables together: an
`orders` row points at the `customers` row it belongs to.

```sql
CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id)
);
```

When foreign-key enforcement is on (`PRAGMA foreign_keys = ON;`), SQLite
rejects an `orders` row whose `customer_id` has no matching customer, and can
block deleting a customer that still has orders. This is what keeps related
data from drifting out of sync.
