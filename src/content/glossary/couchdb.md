---
term: CouchDB
short: A document database you talk to over plain HTTP, famous for effortless replication and offline sync.
---

[Apache CouchDB](https://couchdb.apache.org/) is an open-source [[document-database|document database]] that stores records as JSON documents and is accessed entirely over **plain HTTP** — every document has a URL, and reading or writing data is just a web request. It emerged in 2005 (an early arrival to what became the [[nosql|NoSQL]] movement) with the motto "relax".

## Query example

Because the interface is HTTP, you can use it from anything that can make a web request:

```bash
# Store a document
curl -X PUT http://localhost:5984/library/ada \
  -d '{"name": "Ada Osei", "borrowed": ["Pride and Prejudice"]}'

# Query with a Mango selector: find members named Ada
curl -X POST http://localhost:5984/library/_find \
  -d '{"selector": {"name": "Ada Osei"}}'
```

## Features & Architecture

CouchDB's defining feature is **replication**: any two CouchDB databases can synchronize with each other, in either direction, resuming after interruptions. Combined with its sibling project **PouchDB** (which runs the same protocol inside a web browser), this makes it a natural fit for offline-first applications — the app works locally and syncs whenever a connection appears. Every document carries a revision id, and conflicting edits are kept and surfaced rather than silently lost. Like other [[document-database|document stores]], it trades [[join|joins]] and [[normalization|normalization]] for self-contained records and easy distribution.

## Additional Resources

- [CouchDB Documentation](https://docs.couchdb.org/)
