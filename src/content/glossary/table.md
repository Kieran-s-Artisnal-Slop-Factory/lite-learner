---
term: Table
short: A named collection of rows and columns — the basic structure that holds data in a relational database.
---

A **table** is the fundamental container of data in a relational database. It
has a fixed set of named **columns** (each with a type) and holds zero or more
**rows**, where each row is one record.

```sql
CREATE TABLE books (
  id     INTEGER PRIMARY KEY,
  title  TEXT NOT NULL,
  rating INTEGER
);
```

You can picture a table as a spreadsheet: columns are the headings, rows are
the entries. Most tables give one column the role of [[primary-key]] so each
row can be referred to unambiguously.
