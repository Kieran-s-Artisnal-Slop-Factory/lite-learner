---
title: "The first databases"
---

Computers were built to calculate, but businesses quickly noticed the more
lucrative trick: *remembering*. Payrolls, inventories, reservations — by the
1960s, companies were pouring their filing cabinets into machines, and the
first database systems were born.

## From tape to disk

Early records lived on **magnetic tape**, which has one crushing limitation:
it only reads forward. Finding one employee meant winding through everyone
hired before them, so companies literally processed data in nightly
"batches", sorted to match the tape order. The arrival of the **hard disk**
in the 1960s changed the game — any record, reachable directly, in any
order. For the first time you could *look something up* while a customer
waited on the phone. Software was needed to organize that freedom, and that
software became the database management system.

## Hierarchies and networks

The first generation organized records the way an org chart organizes
people. IBM's **IMS** (Information Management System, 1966–68) arranged data
as a **hierarchy** — a tree of parent and child records. It was built with
North American Rockwell for the Apollo program, tracking the millions of
parts in the Saturn V rocket: a rocket has stages, stages have assemblies,
assemblies have parts. For bill-of-materials data, a tree is a natural fit —
and IMS was so solid it still runs in some banks today.

Around the same time Charles Bachman built **IDS** (Integrated Data Store),
generalizing trees into **networks**: records connected by pointers in any
pattern, so an order could link to both a customer *and* a product. The
CODASYL committee standardized this approach in 1969, and it won Bachman a
Turing Award — computing's Nobel Prize.

## The catch: you had to navigate

These systems shared one deep limitation. To answer any question, a
programmer wrote code that **navigated**, hop by hop, along the database's
physical pointers: *start at this customer, follow to their first order,
follow to the next…* Every question was a program. Worse, questions the
pointer layout hadn't anticipated — "which products sold best in March?" —
could require restructuring the entire database, then rewriting the programs
that depended on the old shape.

Data and the paths through it were welded together. Everyone could feel the
problem; it took a mathematician at IBM to see the way out — and his idea
was so radical his own employer initially sat on it.
