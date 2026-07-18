---
term: ClickHouse
short: An open-source columnar database built for real-time analytics over billions of rows.
---

[ClickHouse](https://clickhouse.com/) is an open-source [[columnar-database|columnar database]] built for **real-time analytics**: sub-second aggregations over billions of [[row|rows]]. It was developed at Yandex (Russia's largest search engine) to power Metrica, its web-analytics product, and open-sourced in 2016.

## Query example

ClickHouse uses [[sql|SQL]], with extensions tuned for analytics:

```sql
SELECT toStartOfMonth(order_date) AS month,
       count() AS orders,
       avg(total) AS avg_order
FROM orders
GROUP BY month
ORDER BY month;
```

Because data is stored column-by-column, this query reads only `order_date` and `total` — not every column of every row — which is the core [[columnar-database|columnar]] advantage.

## Features & Architecture

ClickHouse runs as a server (unlike the embedded [[duckdb|DuckDB]]) and is engineered for both massive ingestion — millions of events per second — and fast querying at the same time, with aggressive compression, vectorized execution, and [[horizontal-scaling|horizontal scaling]] across clusters. The trade-off is the usual columnar one: it's built for appending and analyzing event streams (page views, logs, metrics, telemetry), not for updating individual rows or serving as an application's [[transaction|transactional]] database. It has become one of the most popular engines for user-facing analytics dashboards.

## Additional Resources

- [ClickHouse Documentation](https://clickhouse.com/docs)
