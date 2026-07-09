---
title: "Maintaining a derived value automatically"
initial_sql: |
  CREATE TABLE docs (
    id INTEGER PRIMARY KEY,
    body TEXT,
    revision INTEGER DEFAULT 0
  );
  INSERT INTO docs (id, body) VALUES (1, 'first draft');
desired_state:
  query: "SELECT revision FROM docs WHERE id = 1;"
  rows:
    - { revision: 2 }
---

Triggers can keep a derived column in sync so the application never has to. A
common pattern is bumping a revision number (or a `last_modified` timestamp)
every time a row's content changes.

An `AFTER UPDATE OF body` trigger fires only when the `body` column is updated.
Inside it we bump `revision` for the affected row:

```sql
CREATE TRIGGER bump_revision
AFTER UPDATE OF body ON docs
BEGIN
  UPDATE docs SET revision = revision + 1 WHERE id = NEW.id;
END;
```

That inner `UPDATE` only touches `revision`, not `body`, so it doesn't set off
the trigger again — no infinite loop.

## Your task

1. Create the `bump_revision` trigger above.
2. Update the document's `body` **twice** (to any new values).

Each content change should increment `revision`.

Check your solution — after two edits, `revision` should be `2`.
