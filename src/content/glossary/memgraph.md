---
term: Memgraph
short: An in-memory graph database, Cypher-compatible and built for real-time streaming graphs.
---

[Memgraph](https://memgraph.com/) is a [[graph-database|graph database]] that keeps its graph **in memory**, aiming at real-time workloads: fraud detection as payments stream in, network monitoring, recommendations computed live. It is queryable with the same **Cypher** language as [[neo4j|Neo4j]], making it largely a drop-in alternative where speed on a hot, changing graph matters most.

## Query example

```cypher
// Accounts within 3 hops of a flagged account — a typical fraud query
MATCH (flagged:Account {id: "acc-042"})-[:SENT_MONEY_TO*1..3]->(suspect:Account)
RETURN DISTINCT suspect.id;
```

The `*1..3` is the graph superpower: "follow this relationship between one and three hops" — a question that turns into painful recursive [[join|joins]] in a [[relational-database|relational database]] is one line here.

## Features & Architecture

Memgraph is written in C++ with an in-memory-first architecture (durability comes from snapshots and a write-ahead log), supports [[transaction|ACID transactions]], and can consume data directly from streams like Kafka, updating the graph as events arrive. It also ships **MAGE**, a library of built-in graph algorithms (PageRank, community detection, shortest paths) callable from Cypher. Founded in 2016, it competes with [[neo4j|Neo4j]] on the performance-critical end of the graph niche.

## Additional Resources

- [Memgraph Documentation](https://memgraph.com/docs)
