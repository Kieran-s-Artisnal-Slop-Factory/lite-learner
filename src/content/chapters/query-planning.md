---
title: Query Planning
exercises:
  - reading-query-plans
  - index-a-lookup
  - index-a-join
---

`EXPLAIN QUERY PLAN` shows how SQLite intends to run a query — scanning a whole
table, or searching an index. Learn to read a plan, spot the slow `SCAN`s, and
add the indexes that turn them into fast `SEARCH`es.
