---
term: Pinecone
short: A fully managed vector database for similarity search over AI embeddings.
---

[Pinecone](https://www.pinecone.io/) is a fully managed [[vector-database|vector database]]: a cloud service purpose-built to store [[embedding|embeddings]] and answer "what's most *similar* to this?" at scale. Founded in 2019, it rode the AI wave to become one of the best-known names in the category, powering semantic search and retrieval-augmented generation (RAG) for AI assistants.

## Method of use

There's no query language like [[sql|SQL]] — you upsert vectors and query by vector through an API:

```python
# Python client
index.upsert(vectors=[
    ("doc-1", [0.12, -0.48, 0.91, ...], {"text": "Dog Training"}),
    ("doc-2", [0.15, -0.44, 0.89, ...], {"text": "Puppy Care"}),
])

# Embed the user's question, then find the 3 nearest neighbours
results = index.query(vector=embed("How do I train my puppy?"), top_k=3)
# → doc-2 (0.98), doc-1 (0.96), ...
```

## Features & Architecture

Pinecone is serverless: you never manage machines or tune the approximate-nearest-neighbour indexes that make similarity search fast over billions of vectors — that's the product. It supports filtering by metadata alongside vector similarity, namespaces for multi-tenancy, and hybrid (keyword + vector) search. As a specialized system it holds *only* embeddings and metadata; applications typically pair it with a [[relational-database|relational database]] that remains the authoritative store of the underlying records.

## Additional Resources

- [Pinecone Documentation](https://docs.pinecone.io/)
- [What are vector embeddings?](https://www.pinecone.io/learn/vector-embeddings/)
