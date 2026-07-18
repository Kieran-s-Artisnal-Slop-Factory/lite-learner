---
term: Redis
short: An in-memory key-value store famous for microsecond speed — the standard choice for caches and sessions.
---

[Redis](https://redis.io/) (REmote DIctionary Server) is a [[key-value-store|key-value store]] that keeps its entire dataset **in memory**, making reads and writes take microseconds. Released in 2009 during the [[nosql|NoSQL]] wave, it became the default answer for caching, user sessions, rate limiting, leaderboards, and queues — the short-lived, speed-critical data that would be wasted on a full [[relational-database|relational database]].

## Query example

Redis has no [[sql|SQL]]; you issue simple commands against keys:

```
SET ticket:2204 "A26"        # valet ticket 2204 → parking spot A26
GET ticket:2204              # → "A26"
EXPIRE ticket:2204 43200     # forget it automatically after 12 hours

INCR page:views              # atomic counter
LPUSH jobs "send-email"      # push onto a list, used as a queue
```

## Features & Architecture

Beyond plain strings, Redis values can be **data structures** — lists, sets, sorted sets, hashes, streams — each with atomic operations, which is why it's sometimes called a "data structure server". Durability is optional and configurable (periodic snapshots or an append-only log), reflecting its role: usually a fast layer *in front of* an authoritative database rather than the [[dbms|system of record]] itself. It scales with replication and clustering, and its protocol is so simple that clients exist for every language. A 2024 license change prompted the open-source fork **Valkey**.

## Additional Resources

- [Redis Documentation](https://redis.io/docs/)
