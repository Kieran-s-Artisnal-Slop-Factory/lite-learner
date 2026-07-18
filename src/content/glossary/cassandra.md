---
term: Cassandra
short: A wide-column store built for massive write-heavy scale across data centers, born at Facebook.
---

[Apache Cassandra](https://cassandra.apache.org/) is an open-source [[wide-column-store|wide-column store]] designed for enormous, write-heavy workloads spread across many machines and data centers. Created at Facebook in 2008 by combining the data model of Google's [[bigtable|Bigtable]] with the distribution design of Amazon's Dynamo (see [[dynamodb|DynamoDB]]), it became one of the defining databases of the [[nosql|NoSQL]] movement.

## Query example

Cassandra's query language, **CQL**, deliberately looks like [[sql|SQL]] — but there are no [[join|joins]], and every query must use the partition key so it can be routed to the right machines:

```sql
CREATE TABLE sensor_readings (
  sensor_id  text,
  reading_at timestamp,
  value      double,
  PRIMARY KEY (sensor_id, reading_at)
);

INSERT INTO sensor_readings (sensor_id, reading_at, value)
VALUES ('temp-42', '2024-03-01 12:00:00', 21.5);

SELECT * FROM sensor_readings
WHERE sensor_id = 'temp-42'
  AND reading_at > '2024-03-01';
```

## Features & Architecture

Cassandra has **no primary server** — every node is equal, data is partitioned and replicated around a ring, and the cluster keeps accepting writes even when machines or whole data centers fail. Consistency is *tunable* per query (how many replicas must agree), trading strictness against speed. This buys near-linear [[horizontal-scaling|horizontal scaling]] for append-heavy data like messages, activity feeds, and telemetry, at the cost of the [[transaction|transactions]] and flexible querying of a [[relational-database|relational database]]. It powers huge deployments at Apple, Netflix, and Discord.

## Additional Resources

- [Cassandra Documentation](https://cassandra.apache.org/doc/latest/)
