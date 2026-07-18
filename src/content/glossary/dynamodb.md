---
term: DynamoDB
short: Amazon's fully managed key-value database, descended from the famous 2007 Dynamo paper.
---

[Amazon DynamoDB](https://aws.amazon.com/dynamodb/) is AWS's fully managed [[key-value-store|key-value]] (and [[document-database|document]]) database, built for single-digit-millisecond lookups at any scale. It descends from **Dynamo**, Amazon's internal 2007 system, whose [published paper](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) — alongside Google's [[bigtable|Bigtable]] paper — showed the industry that relaxing relational guarantees could buy effectively unlimited [[horizontal-scaling|horizontal scale]], helping ignite the [[nosql|NoSQL]] movement.

## Query example

Items live in tables and are addressed by a partition key (plus optional sort key). Access is through the AWS API rather than [[sql|SQL]]:

```javascript
// AWS SDK for JavaScript
await client.send(new PutCommand({
  TableName: "Tickets",
  Item: { ticketId: "2204", spot: "A26" },
}));

const { Item } = await client.send(new GetCommand({
  TableName: "Tickets",
  Key: { ticketId: "2204" },
}));  // → { ticketId: "2204", spot: "A26" }
```

(AWS also offers **PartiQL**, a SQL-flavoured syntax over the same operations.)

## Features & Architecture

DynamoDB is serverless from the user's perspective: no machines to manage, automatic replication across data centers, and pay-per-request pricing. It rewards designing tables around known access patterns — there are no [[join|joins]], and ad-hoc questions are deliberately hard — in exchange for performance that stays flat from one megabyte to hundreds of terabytes. It powers Amazon's own retail site, and launched publicly in 2012.

## Additional Resources

- [DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/)
