---
term: Ingres
short: The Berkeley research database that proved the relational model independently — and led to PostgreSQL.
---

**Ingres** (Interactive Graphics and Retrieval System) was a relational database ([[relational-database|RDBMS]]) research project at UC Berkeley, led by Michael Stonebraker and Eugene Wong through the 1970s. Alongside IBM's [[system-r|System R]], it independently proved that Edgar Codd's [[relational-model|relational model]] could be implemented efficiently — settling the debate that made relational databases the default for the next half-century.

## Contributions

Ingres used its own query language, **QUEL**, rather than [[sql|SQL]] (SQL eventually won on standardization, not elegance). More importantly, because Ingres was built at a university on the era's cheap Unix minicomputers and its code circulated freely, it trained a generation of database builders. Its lineage is remarkable: commercial Ingres, Sybase, and — via Sybase — Microsoft [[sql-server|SQL Server]] all trace back to it.

## Legacy: PostgreSQL

Stonebraker's follow-up project at Berkeley was named **POSTGRES**, literally "post-Ingres". It added extensibility and richer types, later gained SQL support, and matured into [[postgresql|PostgreSQL]] — today one of the most respected open-source databases in the world. Stonebraker received the Turing Award in 2014 for this body of work.

## Additional Resources

- [The Design and Implementation of INGRES (1976 paper)](https://dl.acm.org/doi/10.1145/320473.320476)
