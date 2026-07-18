---
term: Transaction
short: A group of changes that happen all-or-nothing, keeping data consistent even with failures or many users.
---

A transaction bundles several changes into one all-or-nothing unit: "check
availability, take payment, decrement the count, record the sale" either happens
completely or not at all, and no other transaction sees a half-finished state.

It's what stops the last concert ticket from selling twice, and why a bank
transfer never debits one account without crediting the other — even if the power
dies mid-operation. Transactions are what make [[concurrency|concurrent]] use safe.
