---
term: Bigtable
short: Google's internal wide-column store whose 2006 paper helped launch the NoSQL movement.
---

**Bigtable** is Google's distributed [[wide-column-store|wide-column store]], built in the early 2000s to hold datasets — the web crawl, Google Earth imagery, later Gmail and YouTube data — that simply could not fit on any single machine. Its [2006 paper](https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf), alongside Amazon's Dynamo paper (see [[dynamodb|DynamoDB]]), showed the industry that relaxing relational guarantees could buy effectively unlimited [[horizontal-scaling|scale]] — and the [[nosql|NoSQL]] movement took notes. [[cassandra|Cassandra]] and HBase are direct descendants, and it's offered publicly as [Cloud Bigtable](https://cloud.google.com/bigtable).

## Data model & example

A Bigtable is "a sparse, distributed, persistent multi-dimensional sorted map": rows are found by key, columns are grouped into families, and every cell is versioned by timestamp. There are no [[join|joins]] and no [[sql|SQL]] — access is by key lookups and range scans:

```
# cbt command-line tool (Cloud Bigtable)
cbt createtable webpages families=contents
cbt set webpages "com.example/index" contents:html="<html>...</html>"
cbt read webpages prefix="com.example"   # scan all rows for one domain
```

The famous trick in the row key: Google stored URLs *reversed by domain* (`com.example/index`) so pages of the same site sort next to each other, making range scans over one website cheap — in a system with no queries, you design the keys to *be* the query.

## Legacy

Bigtable proved that planet-scale storage was buildable from fleets of cheap machines, but its relaxed guarantees also proved painful enough that Google later built [[spanner|Spanner]] to bring back [[transaction|transactions]] and SQL — the pendulum of the NoSQL era in a single company's history.
