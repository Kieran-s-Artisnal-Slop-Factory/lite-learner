---
term: CockroachDB
short: An open "NewSQL" database inspired by Spanner — PostgreSQL-compatible SQL that scales out and survives failures.
---

[CockroachDB](https://www.cockroachlabs.com/) is a distributed relational database ([[relational-database|RDBMS]]) directly inspired by the [[spanner|Google Spanner]] paper. It speaks the [[postgresql|PostgreSQL]] wire protocol and [[sql|SQL]] dialect, but underneath it automatically shards data across many machines, replicates it for fault tolerance, and keeps [[transaction|transactions]] strictly consistent — [[horizontal-scaling|horizontal scale]] without giving up relational guarantees.

## Features & Architecture

Every CockroachDB node is symmetric: you can connect to any of them, and the cluster automatically distributes, replicates (three copies by default), and rebalances data. Unlike Spanner it needs no atomic clocks, using a software approach to time synchronization instead. The name is a mission statement — like its namesake, the database is built to *survive*: nodes, disks, or entire datacenters can die and the cluster keeps serving with no data loss.

## History

CockroachDB was started in 2014 by ex-Google engineers Spencer Kimball, Peter Mattis, and Ben Darnell, who had worked with [[bigtable|Bigtable]] and its successors and wanted Spanner-like capabilities available outside Google. It became one of the flagship "**NewSQL**" systems, part of the pendulum swing back from [[nosql|NoSQL]] toward SQL-with-scale.

## Additional Resources

- [CockroachDB Documentation](https://www.cockroachlabs.com/docs/)
