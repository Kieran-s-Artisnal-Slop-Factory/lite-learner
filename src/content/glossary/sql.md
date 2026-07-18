---
term: SQL
short: Structured Query Language — the declarative language for defining, querying, and modifying data in a relational database.
---

**SQL** (Structured Query Language) is the language you use to talk to a
relational database. It is *declarative*: you describe the result you want,
and the database engine works out how to produce it.

```sql
SELECT title FROM books WHERE rating >= 4 ORDER BY title;
```

SQL statements fall into a few families — querying data (`SELECT`), changing
data (`INSERT`, `UPDATE`, `DELETE`), and defining structure (`CREATE TABLE`,
`CREATE INDEX`). SQLite implements almost all of standard SQL, with a handful
of its own conveniences.

## Additional Resources

- [SQL: The Untold Story](https://www.youtube.com/watch?v=xQ2Ln4ob7Y8) 
