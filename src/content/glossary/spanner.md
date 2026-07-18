---
term: Spanner
short: Google's globally distributed "NewSQL" database — SQL and transactions across thousands of machines.
---

[Google Spanner](https://cloud.google.com/spanner) is Google's globally distributed relational database ([[relational-database|RDBMS]]), and the flagship of the "**NewSQL**" generation: systems that deliver [[sql|SQL]] and strict [[transaction|transactions]] while still [[horizontal-scaling|scaling horizontally]] across thousands of machines — dissolving the either/or trade-off that launched the [[nosql|NoSQL]] movement.

## Features & Architecture

Spanner's signature trick is **TrueTime**: Google equips its datacenters with atomic clocks and GPS receivers so every server knows the current time within a tiny, known uncertainty. That lets Spanner order transactions consistently *across the planet*, something previously considered impractical, giving applications ordinary relational guarantees over data replicated across continents. It automatically shards ([[horizontal-scaling|splits]]) tables across servers, survives entire datacenter failures, and is offered as the managed **Cloud Spanner** service.

## History

Spanner grew inside Google in the late 2000s because [[bigtable|Bigtable]]'s relaxed guarantees proved painful for products like the advertising backend, which dearly missed transactions. The 2012 Spanner paper landed like the [[bigtable|Bigtable]] and Dynamo papers before it, inspiring open-source "NewSQL" systems — most directly [[cockroachdb|CockroachDB]] — and signaling the industry's pendulum swing back toward relational guarantees at scale.

## Additional Resources

- [Spanner: Google's Globally-Distributed Database (2012 paper)](https://research.google/pubs/spanner-googles-globally-distributed-database-2/)
