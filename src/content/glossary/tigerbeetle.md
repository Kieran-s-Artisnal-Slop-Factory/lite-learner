---
term: TigerBeetle
short: A specialized database built for one job — counting money — with double-entry accounting built in.
---

[TigerBeetle](https://tigerbeetle.com/) is a highly specialized [[dbms|database]] built for **financial transactions**. Instead of general-purpose [[table|tables]], it has exactly two record types — *accounts* and *transfers* — with [double-entry accounting](https://en.wikipedia.org/wiki/Double-entry_bookkeeping) rules built directly into the database. It's a good example of the modern trend of purpose-built databases: by doing one thing, it can process millions of debit/credit [[transaction|transactions]] per second, orders of magnitude faster than a general-purpose [[relational-database|relational database]] doing the same bookkeeping.

## Method of use

TigerBeetle is not relational and has no query language like [[sql|SQL]]. Applications use a client library to create accounts and transfers, and the database enforces the accounting invariants (balances always sum, debits match credits):

```javascript
// Move 10 units from account 1 to account 2 (Node.js client)
await client.createTransfers([{
  id: 1n,
  debit_account_id: 1n,
  credit_account_id: 2n,
  amount: 10n,
  ledger: 1,
  code: 720,
}]);
```

## Features & Architecture

TigerBeetle is written in Zig with a "static allocation" design (no memory allocated after startup), runs as a replicated cluster using a consensus protocol so it survives machine failures, and is engineered around *storage fault tolerance* — it assumes disks lie and corrupt data, and checks everything. It was created in 2020, growing out of payment-switch work on the Gates Foundation's Mojaloop project.

## Additional Resources

- [TigerBeetle Documentation](https://docs.tigerbeetle.com/)
