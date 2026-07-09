---
title: "Querying JSON with json_extract"
initial_sql: |
  CREATE TABLE events (
    id INTEGER PRIMARY KEY,
    payload TEXT
  );
  INSERT INTO events (payload) VALUES
    ('{"user": "ada", "score": 42}'),
    ('{"user": "bo", "score": 17}');
desired_state:
  query: "SELECT user, score FROM answer ORDER BY user;"
  rows:
    - { user: "ada", score: 42 }
    - { user: "bo", score: 17 }
---

SQLite has JSON support built in — no extension to load. JSON is stored as plain
`TEXT`, and functions let you reach inside it. `json_extract(doc, path)` pulls a
value out, where the path starts at `$` (the document root):

```sql
SELECT json_extract('{"user":"ada","score":42}', '$.user');   -- 'ada'
SELECT json_extract('{"user":"ada","score":42}', '$.score');  -- 42
```

Point it at a `TEXT` column holding JSON and you can turn documents into
columns:

```sql
SELECT
  json_extract(payload, '$.user')  AS user,
  json_extract(payload, '$.score') AS score
FROM events;
```

(There's also `json_each` to expand a JSON array into rows, and `json_object` /
`json_array` to build JSON.)

## Your task

Extract the `user` and `score` fields out of each event's JSON `payload` into
`answer`:

```sql
CREATE TABLE answer AS
SELECT
  json_extract(payload, '$.user')  AS user,
  json_extract(payload, '$.score') AS score
FROM events;
```

Check your solution — ada scored 42 and bo scored 17.
