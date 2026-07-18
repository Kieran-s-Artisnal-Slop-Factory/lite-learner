---
title: "From spreadsheets to databases"
---

If you've ever used a spreadsheet, you already understand most of what a
database is.

Picture a sheet you'd make to keep track of your contacts. Across the top you
put headings: *Name*, *Phone*, *Email*, *Age*. Then every person gets
their own line. 

| Name | Phone | Email | Age |
|------|-------|-------|----------|
| James | (111) 123-1234 | james@example.com | 25|
| Jill | (111) 123-1234 | jill@corporation.com | 26|
| Frank | (111) 123-1234 | frank@corporation.com | 32 |
| Kieran | (111) 123-1234 | kieran@example.com | 27 |

The headings describe **what** you're recording; each line is
**one** of the **things** (people in this case) you're recording.

A database is built from exactly that shape. The whole grid is called a
**[[table|table]]**. Each line is a **[[row|row]]** (one contact, one order, one movie — one
*thing*). Each heading is a **[[column|column]]** (one fact that every row has). Where a
spreadsheet file might contain a few sheets, a database usually contains many
tables, one per kind of thing it tracks.

## So what's different?

If a database is just tables, why is it its own piece of software? A few
differences run deeper than they first appear:

- **A spreadsheet trusts you; a database checks you.** In a spreadsheet,
  nothing stops someone typing "next Tuesday" into the *Birthday* column.
  Databases let you declare rules — this column holds dates, this one may
  never be empty, no two rows may share an email — and then *refuse* data
  that breaks them.
- **A spreadsheet is a document; a database is a service.** You open a
  spreadsheet, look at all of it, and edit it by hand. What if you need to put 10,000 records in? Hope you can type fast. On top of that a database is designed
  to be *asked questions*,  usually by programs, and to hand back just the
  answer: "the five most recent purchases", not the whole set of purchases ordered by time.
- **Scale.** Spreadsheets get sluggish in the tens of thousands of rows.
  Databases are comfortable with millions, often billions.

## One word, two meanings

People use "database" loosely for two related things:

1. **The data itself**; the organized collection of tables.
2. **The software that manages it**; properly called a *database management
   system* ([[dbms|DBMS]]). [SQLite](https://sqlite.org/index.html), [PostgreSQL](https://www.postgresql.org/), [MySQL](https://www.mysql.com/), [TigerBeetle](https://tigerbeetle.com/), [DuckDB](https://duckdb.org/) and [MongoDB](https://www.mongodb.com/) are all database management systems.

In everyday speech (and in this course) "database" covers both, and the
context makes it clear which one is meant.

None of this makes spreadsheets bad, for a budget or a guest list they're
often the right tool. The rest of this course is about what happens when your
data, or access needs outgrow them.
