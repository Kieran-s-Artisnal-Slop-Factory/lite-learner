---
title: "Full-text search with FTS5"
initial_sql: |
  CREATE VIRTUAL TABLE docs USING fts5(title, body);
  INSERT INTO docs (title, body) VALUES
    ('SQLite', 'a small fast embedded database'),
    ('Postgres', 'a big client server database'),
    ('Redis', 'an in memory key value store');
desired_state:
  query: "SELECT title FROM answer ORDER BY title;"
  rows:
    - { title: "Postgres" }
    - { title: "SQLite" }
---

Searching text with `LIKE '%word%'` is slow and clumsy. **FTS5** is a built-in
extension that indexes text for fast, ranked keyword search. You create a
**virtual table** backed by the FTS5 engine, then query it with the `MATCH`
operator.

```sql
CREATE VIRTUAL TABLE docs USING fts5(title, body);
```

`MATCH` searches the indexed columns for a term, matching whole words (not
substrings), and it's fast even over huge corpora:

```sql
SELECT title FROM docs WHERE docs MATCH 'database';
```

This database already has a populated `docs` FTS5 table.

## Your task

Find every document whose text contains the word **`database`**, and save its
`title` into `answer`:

```sql
CREATE TABLE answer AS
SELECT title FROM docs WHERE docs MATCH 'database';
```

Check your solution — SQLite and Postgres mention a database; Redis (a "store")
does not.
