---
term: pgvector
short: A PostgreSQL extension that adds vector similarity search — embeddings next to your relational data.
---

[pgvector](https://github.com/pgvector/pgvector) is not a standalone database but an **extension for [[postgresql|PostgreSQL]]** that adds a `vector` [[data-type|data type]] and similarity search — turning an ordinary relational database into a capable [[vector-database|vector database]]. It's the flagship example of the "just use Postgres" philosophy: rather than adding a specialized system like [[pinecone|Pinecone]] or [[qdrant|Qdrant]] to your stack, keep [[embedding|embeddings]] in the database you already run, right next to the rows they describe.

## Query example

Vectors are just a column, and similarity is an operator (`<->` is distance — smaller means more similar):

```sql
CREATE EXTENSION vector;

CREATE TABLE articles (
  id        bigserial PRIMARY KEY,
  title     text,
  embedding vector(1536)
);

-- The 3 articles most similar to the user's (embedded) question
SELECT title
FROM articles
ORDER BY embedding <-> '[0.14, -0.46, 0.90, ...]'
LIMIT 3;
```

Because it's ordinary [[sql|SQL]], similarity search composes freely with [[join|joins]], `WHERE` filters, and [[transaction|transactions]] — the things standalone vector stores handle awkwardly or not at all.

## Features & Architecture

pgvector supports exact search plus HNSW and IVFFlat indexes for fast approximate search over millions of vectors, with several distance metrics (Euclidean, cosine, inner product). Released in 2021 by Andrew Kane, it spread quickly because nearly every Postgres hosting provider enabled it, making vector search a checkbox rather than a new database.

## Additional Resources

- [pgvector on GitHub](https://github.com/pgvector/pgvector)
