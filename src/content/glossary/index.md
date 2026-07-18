---
term: Index
short: An auxiliary structure that lets the database find matching rows fast, without scanning the whole table.
---

An index is a lookup structure the database maintains so it can jump straight to
matching [[row|rows]] instead of reading an entire [[table]]. The
[[query-planner]] uses indexes to turn slow full scans into fast lookups.

They speed up reads at a small cost to writes and storage — you'll create indexes
and reason about when *not* to in the Intermediate SQLite course.
