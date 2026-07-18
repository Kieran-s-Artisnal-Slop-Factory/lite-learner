---
term: Amazon Redshift
short: AWS's managed columnar data warehouse for analytics over petabytes.
---

[Amazon Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html) is AWS's managed **data warehouse**: a [[columnar-database|columnar database]] service for running analytics over very large datasets — up to petabytes — without operating any servers yourself. Launched in 2013, it helped popularize the cloud data warehouse, a market it now shares with [[bigquery|BigQuery]] and Snowflake.

## Query example

Redshift is queried with [[sql|SQL]] (its dialect derives from [[postgresql|PostgreSQL]]):

```sql
SELECT DATE_TRUNC('month', order_date) AS month,
       AVG(total) AS avg_order
FROM orders
GROUP BY 1
ORDER BY 1;
```

As with any [[columnar-database|columnar store]], this reads only the two columns it needs, which is what makes such aggregations fast across billions of rows.

## Features & Architecture

Redshift runs as a cluster: a leader node plans each query and distributes work across compute nodes that each hold a slice of the data — massively parallel processing (MPP), the warehouse cousin of [[horizontal-scaling|horizontal scaling]]. Data is compressed per column, and Redshift Spectrum can query files sitting in S3 without loading them. The typical pattern is that an application's [[relational-database|relational databases]] handle day-to-day [[transaction|transactions]], and their data is copied into Redshift where analysts run heavy reporting queries without slowing production down.

## Additional Resources

- [Amazon Redshift Documentation](https://docs.aws.amazon.com/redshift/)
