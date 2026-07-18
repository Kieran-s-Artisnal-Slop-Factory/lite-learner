---
term: Relationship
short: A link between tables, where a value in one table points at a row in another by its id.
---

Rather than copy the same facts into many rows, a relational database gives each
kind of thing its own [[table]] and connects them: a `borrowed_by` value in
`books` holds the id of a [[row]] in `members`. That pointing-between-tables is a
relationship, and it's what makes a database [[relational-database|relational]].

Storing each fact once this way is [[normalization]]; the column that does the
pointing is a [[foreign-key]].
