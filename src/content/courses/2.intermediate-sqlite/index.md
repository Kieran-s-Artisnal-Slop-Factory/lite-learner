---
title: Intermediate SQLite
chapters:
  - idempotent-database-changes
  - constraints
  - upsert-and-conflicts
  - transactions
  - bulk-operations
  - indexes
  - query-planning
  - intermediate-project
---

Move from writing SQL that *works* to writing SQL you can *trust* in
production. This course covers the guarantees a real database needs:
re-runnable schema scripts, constraints that keep bad data out, conflict-safe
inserts, all-or-nothing transactions, and the indexes that keep queries fast.

You'll build up to designing a small inventory-and-orders system that uses the
lot. Every exercise runs against a real SQLite database, right here in your
browser. It assumes you're comfortable with `SELECT`, `INSERT`, `CREATE TABLE`,
and joins — the ground covered in the Beginner course.
