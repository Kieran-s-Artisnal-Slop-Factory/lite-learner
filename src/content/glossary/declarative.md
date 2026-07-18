---
term: Declarative
short: Describing the result you want and letting the system work out how to produce it — the style of SQL.
---

[[sql]] is declarative: you state *what* you want, not the steps to compute it.

```sql
SELECT name FROM members ORDER BY name;
```

That names the result — members' names, alphabetical — but never says which
order to read rows in or how to sort. The database's [[query-planner]] decides
*how*, often far faster than hand-written procedural code could.
