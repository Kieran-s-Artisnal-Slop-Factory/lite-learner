---
term: Network database
short: An early model generalizing trees into a web of records connected by pointers in any pattern.
---

The network model generalized the tree of a [[hierarchical-database]] into
arbitrary connections: records linked by pointers in any pattern, so an order
could point at both a customer *and* a product. Charles Bachman's IDS pioneered
it, and CODASYL standardized it in 1969.

Like hierarchies, it required programs to navigate physical pointers hop by hop —
exactly the rigidity the [[relational-model]] later solved.
