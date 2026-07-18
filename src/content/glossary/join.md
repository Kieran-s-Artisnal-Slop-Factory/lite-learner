---
term: Join
short: A SELECT that combines rows from two or more tables by matching related columns, letting you read connected data in one result.
---

A **join** combines rows from two or more [[table|tables]] into a single
result by matching a column they share — usually a [[foreign-key]] on one side
and a [[primary-key]] on the other.

```sql
SELECT orders.id, customers.name
FROM orders
JOIN customers ON customers.id = orders.customer_id;
```

An `INNER JOIN` keeps only rows that match on both sides; a `LEFT JOIN` keeps
every row from the left table and fills in `NULL` where the right table has no
match. Joins are how you answer questions that span more than one table.
