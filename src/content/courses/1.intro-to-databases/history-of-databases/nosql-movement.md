---
title: "The NoSQL movement"
---

By the mid-2000s the web had produced a new kind of problem. Google, Amazon, and Facebook served *hundreds of millions* of users, and their data simply no longer fit on one machine, any machine. Classic relational databases of the day were designed to scale **[[vertical-scaling|up/vertically]]** (buy a bigger server); the giants needed to scale **[[horizontal-scaling|out/horizontally]]** (spread data across thousands of cheap servers, and keep going when some inevitably die).

Two famous papers showed it could be done by *relaxing relational guarantees*: [Google's **Bigtable** (2006)](https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf) and [Amazon's **Dynamo** (2007)](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) described stores that spread data across fleets of machines, trading joins and strict transactions for effectively unlimited scale. The industry took notes.

## The movement

A wave of open-source databases followed, and a 2009 meetup needing a hashtag gave it a name: **[[nosql|NoSQL]]**, quickly softened to "not only SQL".

- **MongoDB** (2009) became the face of the movement: a [[document-database|document database]] storing JSON-like bundles. Beyond scale, its pitch was *developer speed*, no upfront table design; store objects shaped like the code already shapes them, and change that shape whenever.
- **Cassandra** (2008), from Facebook via Bigtable/Dynamo DNA, offered massive write-heavy scale across data centres.
- **Redis** (2009) put a [[key-value-store|key-value store]] in memory for blazing caches.
- [[graph-database|Graph databases]] like **Neo4j** carved out the connections-first niche.

For a while, hype declared SQL legacy technology. The types-of-databases from chapter one is largely this era's legacy. Genuinely new tools, each born from a real pressure relational systems of the time handled poorly.

## The pendulum settles

Then reality did its usual editing. Teams rediscovered *why* the relational guarantees existed, duplicated data drifting, "flexible" [[schema|schemas]] becoming undocumented ones, [[transaction|transactions]] dearly missed at billing time. The tools converged from both directions: MongoDB added multi-document transactions; PostgreSQL added first-class JSON; "NewSQL" systems (Google's Spanner, CockroachDB) delivered SQL *and* transactions across thousands of machines, dissolving the original either/or.

Today's answer is boring and healthy: **pick the shape that fits the data**, and the scale. If you have highly specific data at a large scale, pick a specialized DB, if you wan to re-use existing infrastructure maybe keep the existing server and toss a plugin on it. Codd's tables turned out to be largely evergreen, and not tied to just 1 product.

That's the landscape, and the end of the tour. You know what databases are, why they beat folders of files, and how we got here. Time to stop reading and start typing: the "real" course awaits.
