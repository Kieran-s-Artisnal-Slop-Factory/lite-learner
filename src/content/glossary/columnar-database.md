---
term: Columnar database
short: A database that stores tables column-by-column, making analytics over huge datasets fast.
---

A columnar (column-store) database holds the same [[table|tables]] as a
[[relational-database|relational]] one, but stored [[column]]-by-column instead of
[[row]]-by-row.

Summing one column across a billion rows then reads only *that column*, which
makes analytics and reporting fast — at the cost of slower single-row updates.
Examples include DuckDB, ClickHouse, and Amazon Redshift.
