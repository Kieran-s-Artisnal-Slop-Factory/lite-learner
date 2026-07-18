---
term: BigQuery
short: Google's serverless columnar data warehouse — send SQL, get answers over petabytes.
---

[Google BigQuery](https://cloud.google.com/bigquery) is Google Cloud's **serverless data warehouse**: a [[columnar-database|columnar]] analytics service where you never see a server at all. You upload or stream data in, send [[sql|SQL]], and Google transparently fans the query out across however many machines it takes — scanning terabytes in seconds and billing by data processed.

## Query example

BigQuery uses standard [[sql|SQL]]:

```sql
SELECT FORMAT_DATE('%Y-%m', order_date) AS month,
       AVG(total) AS avg_order
FROM `myproject.shop.orders`
GROUP BY month
ORDER BY month;
```

## Features & Architecture

BigQuery is the public version of **Dremel**, Google's internal query system (described in a 2010 paper, continuing the tradition of [[bigtable|Bigtable]] and [[spanner|Spanner]]). Storage and compute are fully separated: data lives compressed column-by-column in Google's storage layer, and each query borrows a fleet of workers just long enough to answer it. Like other warehouses ([[redshift|Redshift]], Snowflake) it complements rather than replaces an application's [[relational-database|relational database]] — production systems handle the [[transaction|transactions]], and their data flows into BigQuery for analysts, dashboards, and increasingly machine-learning workloads to query at leisure.

## Additional Resources

- [BigQuery Documentation](https://cloud.google.com/bigquery/docs)
