---
term: Vector database
short: A database that stores embeddings and finds the items most similar in meaning to a query.
---

A vector database stores [[embedding|embeddings]] — long lists of numbers that
place similar meanings near each other — and answers "what's most similar to
this?".

It powers semantic search and retrieval for AI assistants, where matching by
*meaning* beats matching by keyword. Examples: Pinecone, Qdrant, and the pgvector
extension for PostgreSQL.
