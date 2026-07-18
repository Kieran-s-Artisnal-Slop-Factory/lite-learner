---
term: TimescaleDB
short: A PostgreSQL extension that turns it into a time-series database — full SQL included.
---

[TimescaleDB](https://www.timescale.com/) is a [[time-series-database|time-series database]] built as an **extension to [[postgresql|PostgreSQL]]** rather than a separate system. The pitch: get time-series superpowers — fast time-bucketed queries, compression, automatic data expiry — while keeping full [[sql|SQL]], [[join|joins]], [[transaction|transactions]], and everything else in the Postgres ecosystem. It's the time-series counterpart to what [[pgvector|pgvector]] does for vector search.

## Query example

Its core concept is the **hypertable**: an ordinary-looking table automatically partitioned into chunks by time behind the scenes:

```sql
CREATE TABLE sensors (
  time        timestamptz NOT NULL,
  host        text,
  temperature double precision
);
SELECT create_hypertable('sensors', 'time');

-- Average temperature per host in 5-minute buckets, last hour
SELECT time_bucket('5 minutes', time) AS bucket,
       host,
       AVG(temperature)
FROM sensors
WHERE time > now() - interval '1 hour'
GROUP BY bucket, host;
```

## Features & Architecture

Because old time-series data is rarely updated, TimescaleDB compresses aged chunks into a [[columnar-database|columnar]] format (often 90%+ smaller), while *continuous aggregates* keep per-hour/per-day summaries incrementally up to date, and retention policies drop expired chunks instantly. Because a hypertable is still a Postgres table, metrics can be joined directly against business data — something a standalone system like [[influxdb|InfluxDB]] can't do. TimescaleDB launched in 2017 and its company rebranded as **TigerData** in 2025.

## Additional Resources

- [TimescaleDB Documentation](https://docs.tigerdata.com/)
