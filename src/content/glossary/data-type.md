---
term: Data type
short: The kind of value a column may hold (text, number, date…), which the database enforces.
---

When you create a [[table]] you declare each [[column]]'s type — text, integer,
real, and so on — and the database rejects values that don't fit. This is one of
the core ways a database "checks you" where a spreadsheet simply would not: you
can't accidentally put "next Tuesday" in a number column.

SQLite's handling of types is famously flexible; you'll meet its column types
hands-on in the Beginner SQLite course.
