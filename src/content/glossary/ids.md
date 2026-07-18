---
term: IDS
short: Charles Bachman's 1960s Integrated Data Store — the first network database, and a Turing Award's worth of pointers.
---

**IDS** (Integrated Data Store) was the first [[network-database|network database]], designed by **Charles Bachman** at General Electric in the early 1960s. Where IBM's [[ims|IMS]] restricted data to a [[hierarchical-database|tree]], IDS generalized it into a **network**: records connected by pointers in any pattern, so an order could link to both a customer *and* a product. The CODASYL committee standardized this model in 1969, and the work won Bachman the 1973 Turing Award — computing's Nobel Prize.

## Method of use

Like all pre-relational systems, IDS was **navigational**: no query language, no [[sql|SQL]] — programs walked the pointer structure record by record with imperative calls, in the style later standardized by CODASYL:

```cobol
* Find a customer, then walk the chain of their orders
FIND CUSTOMER USING CUST-ID.
FIND NEXT ORDER WITHIN CUST-ORDERS.
GET ORDER.
```

Records were linked into named *sets* (chains of pointers), and every question meant writing code to follow the right chains — *start at this customer, follow to their first order, follow to the next…*

## Legacy

IDS was fast and space-efficient on 1960s hardware precisely because programs followed physical pointers directly. But that welded data to its access paths: questions the pointer layout hadn't anticipated could mean restructuring the whole database and rewriting the programs that depended on it. That rigidity is exactly what Edgar Codd's [[relational-model|relational model]] severed in 1970. IDS's direct descendant, Cullinane's IDMS, still runs on some mainframes today.
