---
title: "A simple database"
---

Let's build a database on paper. Suppose we run a tiny neighbourhood library
and want to keep track of our books. One table does it:

**books**

| id | title                | author           | year | available |
| -- | -------------------- | ---------------- | ---- | --------- |
| 1  | The Hobbit           | J.R.R. Tolkien   | 1937 | yes       |
| 2  | Pride and Prejudice  | Jane Austen      | 1813 | no        |
| 3  | Kindred              | Octavia Butler   | 1979 | yes       |
| 4  | The Left Hand of Darkness | Ursula K. Le Guin | 1969 | yes  |
| 5  | All Tomorrows | C.M. Kosemen | 2006 | yes |
| 6  | There is no Antimemetics Division | qntm | 2025 | yes |
| 7 | Other Minds: The Octopus, the Sea, and the Deep Origins of Consciousness | Peter Godfrey-Smith | 2016 | no |  
| 8 | The Trial | Franz Kafka | 1925 | no | 

That's a real, honest database table. Reading it with the vocabulary from the
last lesson:

- The **table** is named `books`, and it holds one kind of thing: books.
- Each **row** is one book. Row 3 is *Kindred*, and everything in that row is
  a fact about *that* book.
- Each **column** is one fact every book has: `title`, `author`, `year`,
  `available`.

## Why the `id` column?

The first column deserves a closer look. `id` isn't a fact about the book in
the real world, no book has a "5" printed on it (usually it has an [ISBN](https://en.wikipedia.org/wiki/ISBN) to identify it). It exists so that every
row has a **unique** identifier we can point at. This means that whenever we say "I want the book with an ID of 5", I always get the *All Tomorrows* row. 

So, why not just the title? Well, in our table earlier the titles **were** unique, but they won't always be, for example:

**books**

| id | title | author | year | available |
|----|-------|--------|------|-----------|
| 8 | The Trial | Franz Kafka | 1925 | no | 
| 9	| The Trial	| Rob Rinder	|2023	| yes| 

Different books can share a title, and titles get retyped with typos. So, the database assigns each row a number, incremented (goes up by 1) each time, and guaranteed
never to repeat. When someone wants a book, they refer to "book 8" rather than "the row
whose title is The Trial… and might be the one I'm looking for... probably". This special column is called the **primary key**, and nearly every table has one. It's the same idea as a membership number on a library card, a student ID, or an order number on a
receipt, nobody **is** their number, but the number makes lookups unambiguous.

## Columns have types

Notice each column holds one *kind* of value: `title` is text, `year` is a
number, `available` is yes/no. Databases make this explicit. When you create
a table you declare each column's **type**, and the database rejects values
that don't fit. That's one of those "the database checks you" rules from the
previous lesson, and it's why nobody can accidentally put "next Tuesday" in a
number column.

One table like this is already useful. But a library needs to track more than
books. In the real world they might need to track members, loans, due dates. We *could* cram all of that into one giant table, but as you're about to see, there's a much better way.
