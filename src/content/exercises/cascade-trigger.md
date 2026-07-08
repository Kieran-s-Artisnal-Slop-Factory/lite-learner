---
title: "Cascading deletes with a trigger"
initial_sql: |
  CREATE TABLE authors (
    id INTEGER PRIMARY KEY,
    name TEXT
  );
  CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    author_id INTEGER,
    title TEXT
  );
  INSERT INTO authors (id, name) VALUES (1, 'Ada'), (2, 'Bo');
  INSERT INTO books (id, author_id, title) VALUES
    (1, 1, 'Notes'),
    (2, 1, 'Essays'),
    (3, 2, 'Poems');
desired_state:
  query: "SELECT title FROM books ORDER BY title;"
  rows:
    - { title: "Poems" }
---

When you delete a parent row, its children can be left orphaned. One way to keep
things tidy is an `AFTER DELETE` trigger that removes the related rows — a manual
cascade. Inside a delete trigger, `OLD` refers to the row that was just removed:

```sql
CREATE TRIGGER delete_authors_books
AFTER DELETE ON authors
BEGIN
  DELETE FROM books WHERE author_id = OLD.id;
END;
```

(Foreign keys offer a built-in `ON DELETE CASCADE` for this too; a trigger gives
you the same effect with full control over what happens.)

## Your task

1. Create the `delete_authors_books` trigger above.
2. Delete the author with `id = 1` (Ada).

Her two books should be removed automatically along with her.

Check your solution — only Bo's book, Poems, should remain.
