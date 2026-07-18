---
term: Access control
short: Granting each user or program exactly the data and powers it needs, and nothing more.
---

A database can create separate accounts and grant each one specific powers — this
app may read sales but not change them; only payroll may see salaries. That lets a
database be safely shared, unlike a spreadsheet that shares all-or-nothing.

The guiding rule is the [[principle-of-least-privilege]]. Server databases like
PostgreSQL have rich account systems; an embedded database like SQLite leans on
the app around it.
