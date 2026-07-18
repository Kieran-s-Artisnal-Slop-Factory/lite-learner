---
term: Query planner
short: The part of a database that decides how to execute a query efficiently, so you only say what you want.
---

Because [[sql]] is [[declarative]], the database is free to choose *how* to
answer each query. The query planner works that out — a full table scan, or an
[[index]] shortcut a million times faster — using statistics about your data
that you don't have.

The same question can be optimized differently as your data grows, with no
change to the query you wrote.
