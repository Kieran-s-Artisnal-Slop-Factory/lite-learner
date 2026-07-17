---
title: "Query languages"
---

If databases are things you *ask*, you need a language to ask in. For
relational databases that language is **SQL** — Structured Query Language —
and it's one of the best investments in all of computing. Here's why.

## You say what, not how

SQL is **declarative**: you describe the result you want, not the steps to
compute it.

```sql
SELECT name, email
FROM members
WHERE joined < '2020-01-01'
ORDER BY name;
```

Even never having seen SQL, you can nearly read that aloud: *names and
emails of members who joined before 2020, alphabetically.* Nowhere does it
say which file to scan, what order to read rows in, or how to sort
efficiently. The database's **query planner** works that out — and this is a
genuine performance superpower. The same question might be answered by
brute-force scanning or by an index shortcut a million times faster; the
planner picks, using knowledge about your data that you don't have. Your
hand-written file-reading code would do it one way, forever, and you'd
maintain that code for every new question.

## Learn once, use everywhere

SQL was standardized in 1986 and is spoken, with minor accents, by
practically every relational database: SQLite, PostgreSQL, MySQL, SQL
Server, Oracle, DuckDB. The core — asking with `SELECT`, adding with
`INSERT`, changing with `UPDATE` — transfers almost untouched between them.

The skill's reach keeps growing. Analytics warehouses (BigQuery, Redshift),
streaming systems, even many originally "NoSQL" products have added SQL or
SQL-like languages, because everyone already speaks it. Fifty years of
tools, books, and job postings agree: SQL may be the single most portable
skill in software.

Non-relational databases have their own idioms — document databases like
MongoDB use API-style queries, graph databases use languages like Cypher —
but SQL remains the lingua franca, and its concepts (filtering, combining,
aggregating) echo through all of them.

## Questions stop being projects

Put the pieces of this chapter together. One authoritative copy of the data.
Rules the database enforces. Safe simultaneous access. And now a standard
language where a new question is one sentence, optimized automatically, with
an answer that's current as of *right now* — not as of whenever someone last
rebuilt the report sheet.

That's the real answer to "why use databases": they turn *finding things out*
from an afternoon of spreadsheet wrangling into a sentence.

And SQL is exactly what the Beginner SQLite course teaches, hands-on, right
after this one. First, though — a short story about where all of this came
from.
