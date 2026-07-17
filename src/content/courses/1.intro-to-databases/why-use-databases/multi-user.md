---
title: "Many users, one database"
---

A spreadsheet fundamentally belongs to one person at a time. A database is
built from the ground up to be shared — by people, and even more so by
*programs*. Two capabilities make that safe: access control and concurrency.

## Not everyone gets the keys

Share a spreadsheet and you've shared *all of it* — every sheet, every
column, usually with full edit rights. The real world needs finer control,
and databases provide it.

A database lets you create separate accounts and grant each one exactly the
powers it needs:

- The reporting dashboard can **read** sales data but never change anything.
- The checkout system can **add** orders but not delete them.
- Only the payroll application can see the salary table at all.
- The intern can do… very little, safely.

This is called the **principle of least privilege** — every person and
program gets the minimum access needed to do its job. It limits honest
mistakes and contains break-ins: a compromised dashboard that can only read
public product data is an annoyance, not a catastrophe. Databases can also
log who changed what and when, which spreadsheet history only gestures at.

(How much of this you get varies by system: server databases like PostgreSQL
have rich account systems, while an embedded database like SQLite leans on
the app around it — but the *model* of least privilege is universal.)

## Many hands, no stepped-on toes

The subtler problem is **concurrency**: many users changing data at the same
moment. Suppose a concert has one ticket left and two fans click "buy"
simultaneously. Both screens show *1 available*; both purchases proceed;
the venue has sold seat 14C twice. Cloud spreadsheets don't prevent this —
letting two people type at once is exactly how it happens.

Databases solve it with **transactions**: a group of changes declared to be
all-or-nothing. "Check availability, take payment, decrement the count,
record the sale" becomes one atomic unit — either every step happens or none
do, and no other transaction can interleave halfway through. The second
buyer's transaction finds zero tickets and is cleanly declined. The same
mechanism is why a bank transfer never subtracts from one account without
adding to the other, even if the power dies mid-operation.

Because transactions make simultaneous use *safe*, databases can make it
*fast* — thousands of checkouts, seat reservations, and balance updates per
second against one authoritative copy of the data. That's the scalability
behind every ticket site and bank you've ever used, and it's simply not a
thing a folder of files can do.

One copy, many users, rules enforced, changes atomic. The last ingredient is
the language you ask your questions in.
