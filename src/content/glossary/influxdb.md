---
term: InfluxDB
short: The best-known dedicated time-series database, built for metrics and sensor data.
---

[InfluxDB](https://www.influxdata.com/products/influxdb-overview/) is the best-known dedicated [[time-series-database|time-series database]]. First released in 2013, it's built for endless streams of timestamped measurements — server metrics, sensor readings, IoT telemetry — and the workload that comes with them: append constantly, query by time range, summarize per minute/hour/day, and expire old data automatically.

## Query example

Data points carry a measurement name, tags (indexed labels), fields (values), and a timestamp. Recent InfluxDB versions query with **InfluxQL**, a [[sql|SQL]]-like dialect built around time:

```sql
-- Average CPU temperature per host, in 5-minute buckets, over the last hour
SELECT MEAN(temperature)
FROM sensors
WHERE time > now() - 1h
GROUP BY time(5m), host;
```

The `GROUP BY time(5m)` is the time-series signature — bucketing by time is so central it's built into the language.

## Features & Architecture

InfluxDB's storage engine is organized around time: writes are append-optimized, data is compressed heavily (timestamps and values compress extremely well), and **retention policies** downsample or delete old data automatically — keeping raw per-second data for a week but hourly averages for years. It typically runs alongside collection agents (Telegraf) and dashboards (Grafana), and its modern versions are built in Rust on columnar Apache Arrow, blurring toward [[columnar-database|columnar]] analytics engines.

## Additional Resources

- [InfluxDB Documentation](https://docs.influxdata.com/)
