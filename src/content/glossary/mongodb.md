---
term: MongoDB
short: The most popular document database — JSON-like records, flexible schemas, and developer-friendly queries.
---

[MongoDB](https://www.mongodb.com/) is the most widely used [[document-database|document database]], and was the face of the [[nosql|NoSQL]] movement. Instead of [[table|tables]] of [[row|rows]], it stores **documents** — JSON-like bundles (in a binary format called BSON) grouped into *collections*. Documents in the same collection can have different shapes, so there's no upfront [[schema|schema]] design: you store objects shaped the way your code already shapes them.

## Query example

MongoDB is queried through an API-style language rather than [[sql|SQL]]. Finding all adult members looks like:

```javascript
db.members.find({ age: { $gt: 18 } })

// Insert a document
db.members.insertOne({
  name: "Ada Osei",
  phone: "555-0141",
  borrowed: ["Pride and Prejudice"]
})
```

Filters, projections, and an *aggregation pipeline* (MongoDB's answer to `GROUP BY`) echo the same concepts SQL expresses, just in JSON form.

## Features & Architecture

MongoDB runs as a server and scales [[horizontal-scaling|horizontally]] through built-in sharding and replica sets. Its trade-offs are the classic document ones: reading a whole record at once is easy and fast, while cross-collection [[join|joins]] and [[normalization|normalization]] are weaker than in a [[relational-database|relational database]]. Released in 2009 with a pitch of *developer speed*, it later re-absorbed relational lessons — adding multi-document [[transaction|transactions]] in 2018 — as the NoSQL pendulum settled.

## Additional Resources

- [MongoDB Documentation](https://www.mongodb.com/docs/)
