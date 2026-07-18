---
term: Qdrant
short: An open-source vector database written in Rust, self-hostable and queried over a simple API.
---

[Qdrant](https://qdrant.tech/) (pronounced "quadrant") is an open-source [[vector-database|vector database]] written in Rust. Like [[pinecone|Pinecone]] it stores [[embedding|embeddings]] and answers similarity queries, but it can be self-hosted — a single Docker container gets you a running instance — which made it a favourite for teams who want vector search without a managed-cloud dependency.

## Method of use

Qdrant exposes a REST (and gRPC) API; points are vectors with an id and optional payload:

```bash
# Insert points
curl -X PUT http://localhost:6333/collections/articles/points \
  -d '{"points": [
        {"id": 1, "vector": [0.12, -0.48, 0.91], "payload": {"text": "Dog Training"}},
        {"id": 2, "vector": [0.15, -0.44, 0.89], "payload": {"text": "Puppy Care"}}
      ]}'

# Find the 3 most similar points to a query vector
curl -X POST http://localhost:6333/collections/articles/points/search \
  -d '{"vector": [0.14, -0.46, 0.90], "limit": 3}'
```

## Features & Architecture

Qdrant builds HNSW approximate-nearest-neighbour indexes for fast search over millions of vectors, and its standout feature is rich **payload filtering** — combining "similar to this" with structured conditions ("and category = 'pets', published this year") in one query. It supports quantization to shrink memory use, and clustering for [[horizontal-scaling|scaling out]]. Started in 2021, it's among the most popular engines behind semantic search and RAG pipelines for AI applications.

## Additional Resources

- [Qdrant Documentation](https://qdrant.tech/documentation/)
