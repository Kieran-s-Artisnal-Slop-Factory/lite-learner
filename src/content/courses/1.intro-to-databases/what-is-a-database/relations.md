---
title: "Relations: tables that point at each other"
---

Our library tracks books. Now it needs to track *who borrowed what*. The
tempting move is to add columns to `books` (and lots of people do). We might consider adding the borrower name, borrower phone, due date, etc. That might fly in a spreadsheet, but there's a better way in a database. If Ada borrows three books, her phone number gets copied
into three rows; when it changes, you must find and fix every copy, and the
day you miss one, your data quietly disagrees with itself.

The database answer: **give each kind of thing its own table, and connect
them by id.** Here's an example:

**members**

| id | name         | phone    |
| -- | ------------ | -------- |
| 1  | Ada Osei     | 555-0141 |
| 2  | Sam Alvarez  | 555-0177 |

**books**

| id | title               | author         | borrowed_by |
| -- | ------------------- | -------------- | ----------- |
| 1  | The Hobbit          | J.R.R. Tolkien |             |
| 2  | Pride and Prejudice | Jane Austen    | 1           |
| 3  | Kindred             | Octavia Butler | 2           |

The new `borrowed_by` column doesn't hold a name or a phone number, it holds
a **member id**. A common format you might see is `<table name>.<column>`, so in this case it's referencing `members.id`. Row 2's `borrowed_by = 1` means "this book is out with member 1", and member 1's row has everything else about Ada, stored exactly
once (fancy name for this is **[[normalization|normalization]]**). Change her phone number in one place and every book she's borrowed is
automatically up to date. An empty `borrowed_by` simply means the book is on
the shelf.

This pointing-between-tables is a **[[relationship|relationship]]**, and databases built
around tables connected this way are called **[[relational-database|relational databases]]**. [[sqlite|SQLite]],
[[postgresql|PostgreSQL]], and [[mysql|MySQL]] are all relational, and they are the kind you'll meet
most often.

> "relational" actually comes from *relation*, the mathematical word for a table itself, not from "relationships". Some older textbooks (especially pure theory ones), and references might call a **table** a relation, but it's not common anymore.

## And non-relational?

Not every database organizes data as inter-pointing tables. A
**non-relational** database (often called **[[nosql|NoSQL]]**) might store each thing
as one self-contained document, closer to a filled-in form:

```json
{
  "name": "Ada Osei",
  "phone": "555-0141",
  "borrowed": ["Pride and Prejudice"]
}
```

Everything about Ada in one bundle, no second table to consult. That's
convenient for reading one member's whole record at a glance, at the cost of
the duplication problems we just avoided (that borrowed title is a *copy*).
They make different trade-offs, and the next lesson tours the main options.
