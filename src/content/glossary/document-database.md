---
term: Document database
short: A database that stores each record as one self-contained document (usually JSON-like), with no fixed columns.
---

A document database stores each record as a self-contained, usually JSON-like
bundle, with all of one member's data nested together:

```json
{ "name": "Ada Osei", "phone": "555-0141", "borrowed": ["Pride and Prejudice"] }
```

There's no fixed list of [[column|columns]], so records can vary in shape —
flexible for fast-changing data, at the price of duplication and weaker
cross-record guarantees. It's the classic [[nosql]] shape; MongoDB and CouchDB
are examples.
