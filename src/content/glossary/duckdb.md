---
term: DuckDB
short: An embedded columnar database — "the SQLite of analytics" — for crunching big files on your own machine.
---

[DuckDB](https://duckdb.org/) is an embedded [[columnar-database|columnar database]], often called "the [[sqlite|SQLite]] of analytics". Like SQLite it's a small library that runs *inside* your application with no server to manage — but where SQLite stores data row-by-row for transactional work, DuckDB stores it column-by-column and executes queries vectorized, making it dramatically faster at analytical questions: aggregations, group-bys, and scans over millions of rows.

## Query example

DuckDB speaks standard [[sql|SQL]], and can query files directly without importing them first:

```sql
-- Query a CSV or Parquet file as if it were a table
SELECT strftime(order_date, '%Y-%m') AS month,
       AVG(total) AS avg_order
FROM 'orders.parquet'
GROUP BY month
ORDER BY month;
```

## Features & Architecture

DuckDB's sweet spot is *local analytics*: a data scientist's laptop, a script, a notebook, or an application that needs reporting queries over gigabytes of data without standing up a warehouse like [[clickhouse|ClickHouse]] or [[redshift|Redshift]]. It integrates tightly with Python and R dataframes, reads Parquet/CSV/JSON natively, and handles datasets larger than memory by spilling to disk. Development began in 2018 at CWI in Amsterdam (the same Dutch research institute behind decades of columnar-database research), and it has become a favourite tool of the modern data ecosystem.

## Additional Resources

- [DuckDB Documentation](https://duckdb.org/docs/)
- [Why DuckDB](https://duckdb.org/why_duckdb)
