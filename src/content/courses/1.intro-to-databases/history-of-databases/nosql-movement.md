---
title: "The NoSQL movement"
---

By the mid-2000s the web had produced a new kind of problem. Google, Amazon,
and Facebook served *hundreds of millions* of users, and their data simply
no longer fit on one machine — any machine. Classic relational databases of
the day were designed to scale **up** (buy a bigger server); the giants
needed to scale **out** (spread data across thousands of cheap servers, and
keep going when some inevitably die).

Two famous papers showed it could be done by *relaxing relational
guarantees*: Google's **Bigtable** (2006) and Amazon's **Dynamo** (2007)
described stores that spread data across fleets of machines, trading joins
and strict transactions for effectively unlimited scale. The industry took
notes.

## The movement

A wave of open-source databases followed, and a 2009 meetup needing a
hashtag gave it a name: **NoSQL** — quickly softened to "not only SQL".

- **MongoDB** (2009) became the face of the movement: a document database
  storing JSON-like bundles. Beyond scale, its pitch was *developer speed* —
  no upfront table design; store objects shaped like the code already
  shapes them, and change that shape whenever.
- **Cassandra** (2008), from Facebook via Bigtable/Dynamo DNA, offered
  massive write-heavy scale across data centres.
- **Redis** (2009) put a key-value store in memory for blazing caches.
- Graph databases like **Neo4j** carved out the connections-first niche.

For a while, hype declared SQL legacy technology. The types-of-databases
zoo from chapter one is largely this era's legacy — genuinely new tools,
each born from a real pressure relational systems of the time handled
poorly.

## The pendulum settles

Then reality did its usual editing. Teams rediscovered *why* the relational
guarantees existed — duplicated data drifting, "flexible" schemas becoming
undocumented ones, transactions dearly missed at billing time. The tools
converged from both directions: MongoDB added multi-document transactions;
PostgreSQL added first-class JSON; "NewSQL" systems (Google's Spanner,
CockroachDB) delivered SQL *and* transactions across thousands of machines —
dissolving the original either/or.

Today's answer is boring and healthy: **pick the shape that fits the data**.
Caches go in key-value stores, analytics in columnar warehouses, embeddings
in vector databases — and the system of record, for most applications, is
still a relational database speaking fifty-year-old SQL. Codd's tables
turned out to be less a product generation than a keeper.

That's the landscape, and the end of the tour. You know what databases are,
why they beat folders of files, and how we got here. Time to stop reading
and start typing: the **Beginner SQLite** course awaits.
