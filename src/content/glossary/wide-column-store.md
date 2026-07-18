---
term: Wide-column store
short: A NoSQL database that stores rows with flexible columns, partitioned across many machines by key.
---

A wide-column store organizes data into [[table|tables]] of [[row|rows]], but unlike a [[relational-database|relational database]] each row can have its own set of [[column|columns]], and columns are grouped into *column families* that are stored together on disk. Rows are located by a partition key, which lets the database spread data across thousands of machines and [[horizontal-scaling|scale horizontally]] almost without limit.

The model descends from [[bigtable|Google's Bigtable]] and, mixed with ideas from Amazon's Dynamo, powers systems like [[cassandra|Apache Cassandra]]. Wide-column stores trade away [[join|joins]] and rich [[transaction|transactions]] in exchange for massive write throughput and predictable performance at planetary scale, which made them a centerpiece of the [[nosql|NoSQL]] movement.

Despite the similar name, a wide-column store is **not** the same as a [[columnar-database|columnar database]]: columnar databases store relational tables column-by-column to speed up analytics, while wide-column stores are a distributed, schema-flexible data model for enormous operational workloads.
