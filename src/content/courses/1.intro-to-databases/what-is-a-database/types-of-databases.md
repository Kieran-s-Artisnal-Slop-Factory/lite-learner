---
title: "Types of databases"
---

Databases specialize. The shape you store data in determines what's fast,
what's easy, and what's painful — so different jobs grew different kinds of
databases. Here are the families you'll actually encounter.

### Relational (row store)

The classic: tables of rows and columns, connected by ids, with rules that
keep data honest. Stored row-by-row, which makes the everyday work of apps —
look up *this* order, update *that* member — fast. This is the default choice
for most software, and the kind this site teaches: SQLite (the small
embedded one that lives inside apps and phones), PostgreSQL, and MySQL are
the household names.

### Columnar (column store)

The same tables, stored column-by-column instead. That sounds like a
technicality, but it changes everything: adding up one column across a
billion rows only has to read *that column*, not a billion whole rows.
Columnar databases power analytics and reporting — "average order value per
month for five years" — and are comparatively slow at updating individual
rows. Examples: ClickHouse, Amazon Redshift, DuckDB.

### Key-value

The simplest possible idea: a giant lookup of *key → value*, like a coat
check. Give it ticket `session:8841`, get back whatever blob was stored under
it. No tables, no relationships, no questions other than "what's under this
key?" — in exchange, it's blisteringly fast. Used for caches, user sessions,
and feature flags. Examples: Redis, Amazon DynamoDB.

### Document

Each record is a self-contained **document** (usually JSON-like, as at the
end of the last lesson): all of a member's data in one nested bundle. There's
no fixed list of columns, so records can vary in shape and evolve without
ceremony — flexible for fast-changing data, at the price of duplication and
weaker cross-record guarantees. Examples: MongoDB, CouchDB.

### Graph

Some data *is mostly connections*: who follows whom, what depends on what,
how A launders money to D through B and C. Graph databases store **nodes**
(things) and **edges** (connections) directly, and are built to answer
"friend-of-a-friend"-style questions that require hopping many links — the
kind of query that gets awkward in tables. Examples: Neo4j, Memgraph.

### Vector

The newcomer, riding the AI wave. Text, images, and audio can be converted
into long lists of numbers (**embeddings**) where similar meanings land near
each other. A vector database stores those lists and answers "what's most
*similar* to this?" — powering semantic search and retrieval for AI
assistants. Examples: Pinecone, Qdrant, and the pgvector extension for
PostgreSQL.

### Time-series

Built for endless streams of timestamped measurements — server temperatures,
heart rates, stock ticks. Optimized for "append constantly, query by time
range, summarize per minute/hour/day", with old data compressed or expired
automatically. Examples: InfluxDB, TimescaleDB.

## Side by side

| Kind        | Data shape                  | Great for                                | Examples                        |
| ----------- | --------------------------- | ---------------------------------------- | ------------------------------- |
| Relational  | Tables, connected by ids    | Most applications; data with rules       | SQLite, PostgreSQL, MySQL       |
| Columnar    | Tables, stored by column    | Analytics over huge datasets             | ClickHouse, Redshift, DuckDB    |
| Key-value   | key → value pairs           | Caching, sessions; raw speed             | Redis, DynamoDB                 |
| Document    | Self-contained documents    | Flexible, fast-changing records          | MongoDB, CouchDB                |
| Graph       | Nodes and edges             | Networks, relationships, many-hop paths  | Neo4j, Memgraph                 |
| Vector      | Embeddings (number lists)   | Similarity search, AI retrieval          | Pinecone, Qdrant, pgvector      |
| Time-series | Timestamped measurements    | Metrics, sensors, monitoring             | InfluxDB, TimescaleDB           |

If in doubt, start relational: it's the general-purpose tool the rest were
specialized *away* from, and the one whose skills transfer everywhere. That's
exactly where this course goes next — but first, a fair question: why bother
with any of this instead of a folder full of spreadsheets?
