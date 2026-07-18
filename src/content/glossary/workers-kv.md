---
term: Workers KV
short: Cloudflare's globally distributed key-value store, readable from servers in hundreds of cities at once.
---

[Workers KV](https://developers.cloudflare.com/kv/) is Cloudflare's [[key-value-store|key-value store]], built into its Workers serverless platform. Its distinguishing feature is **geography**: values are cached across Cloudflare's network of data centers in hundreds of cities, so a read is fast no matter where in the world the request comes from.

## Method of use

There's no query language — code running in a Worker reads and writes keys through a small JavaScript API:

```javascript
// Inside a Cloudflare Worker
await env.TICKETS.put("2204", "A26", { expirationTtl: 43200 });

const spot = await env.TICKETS.get("2204");  // → "A26"
await env.TICKETS.delete("2204");
```

## Features & Architecture

Workers KV is **eventually consistent**: a write lands in one location and propagates outward, so a reader on the other side of the planet may briefly see the old value. That trade-off is what buys planet-wide read speed, and it suits the store's intended uses — configuration, feature flags, redirects, cached API responses, session-like data — where reads vastly outnumber writes and a few seconds of staleness is harmless. For data needing strict [[transaction|transactional]] guarantees, Cloudflare points users at its other products (D1, a hosted [[sqlite|SQLite]], and Durable Objects), which is itself a nice illustration of *pick the shape that fits the data*.

## Additional Resources

- [Workers KV Documentation](https://developers.cloudflare.com/kv/)
