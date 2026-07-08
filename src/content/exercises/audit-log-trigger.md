---
title: "Logging changes with an AFTER trigger"
initial_sql: |
  CREATE TABLE accounts (
    id INTEGER PRIMARY KEY,
    name TEXT
  );
  CREATE TABLE audit_log (
    id INTEGER PRIMARY KEY,
    action TEXT
  );
desired_state:
  query: "SELECT action FROM audit_log ORDER BY id;"
  rows:
    - { action: "INSERT" }
    - { action: "INSERT" }
---

A **trigger** is a block of SQL the database runs automatically when a table is
modified. You choose the timing (`BEFORE` / `AFTER`) and the event (`INSERT` /
`UPDATE` / `DELETE`). A classic use is an **audit log** — recording that
something changed, without the application having to remember to.

An `AFTER INSERT` trigger fires once per inserted row. Inside it, `NEW` refers
to the row just inserted:

```sql
CREATE TRIGGER log_account_insert
AFTER INSERT ON accounts
BEGIN
  INSERT INTO audit_log (action) VALUES ('INSERT');
END;
```

## Your task

1. Create the `log_account_insert` trigger above.
2. Insert two accounts (any names) into `accounts`.

Each insert should fire the trigger and add an `INSERT` row to `audit_log`.

Check your solution — `audit_log` should hold two `INSERT` entries.
