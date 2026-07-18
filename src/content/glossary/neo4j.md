---
term: Neo4j
short: The most popular graph database, queried with the pattern-matching language Cypher.
---

[Neo4j](https://neo4j.com/) is the most widely used [[graph-database|graph database]]. Instead of [[table|tables]], it stores **nodes** (things) and **relationships** (typed, directed connections between them), both of which can carry properties. Data that *is mostly connections* — social networks, recommendations, fraud rings, dependency graphs — lives in it natively, without the [[join|join]] gymnastics the same questions require in a [[relational-database|relational database]].

## Query example

Neo4j is queried with **Cypher**, a [[declarative|declarative]] language whose ASCII-art syntax draws the pattern you're looking for — `(nodes)` in parentheses, `-[relationships]->` as arrows:

```cypher
// Friends-of-friends of Alice who aren't already her friends
MATCH (alice:Person {name: "Alice"})-[:FRIENDS_WITH]->(:Person)-[:FRIENDS_WITH]->(fof)
WHERE NOT (alice)-[:FRIENDS_WITH]->(fof) AND fof <> alice
RETURN DISTINCT fof.name;
```

The query hops across relationships stored as direct pointers, so many-hop questions stay fast regardless of how large the rest of the graph grows.

## Features & Architecture

Neo4j began in 2007 (the name means "network-oriented database", the "4j" from its Java origins) and carved out the connections-first niche during the [[nosql|NoSQL]] era. It runs as a server, supports full [[transaction|ACID transactions]] — unusual among NoSQL contemporaries — and Cypher's core was standardized in 2024 as ISO **GQL**, the first new ISO-standard database language since [[sql|SQL]].

## Additional Resources

- [Neo4j Documentation](https://neo4j.com/docs/)
- [Cypher Manual](https://neo4j.com/docs/cypher-manual/current/introduction/)
