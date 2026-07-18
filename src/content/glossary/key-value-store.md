---
term: Key-value store
short: A database that maps keys directly to values — no tables, just fast lookups by key.
---

A key-value store is the simplest kind of database: a giant lookup of
`key → value`. Hand it `2204:A26`, later ask for `2204`, and get back `A26`.

There are no [[table|tables]] or [[relationship|relationships]], just very fast
access by key — ideal for short-lived data like caches, user sessions, and
feature flags. Examples: Redis, Amazon DynamoDB, Cloudflare Workers KV.
