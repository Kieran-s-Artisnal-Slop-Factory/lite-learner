---
term: System R
short: The 1970s IBM research project that proved relational databases could perform — and invented SQL.
---

**System R** was an IBM Research project (1974–1979, San Jose) built to answer the great skepticism about Edgar Codd's [[relational-model|relational model]]: could something so mathematically abstract ever be *fast*? It could, and System R proved it — becoming the prototype from which nearly every modern [[relational-database|relational database]] descends.

## Contributions

System R's influence is hard to overstate:

- It invented **SEQUEL**, later shortened to **[[sql|SQL]]**, the query language still used by practically every relational database today.
- It pioneered the cost-based **[[query-planner|query optimizer]]**, the machinery that turns a [[declarative|declarative]] question into an efficient execution plan.
- It developed foundational techniques for [[transaction|transactions]], locking, and crash recovery that remain textbook material.

## History

IBM, earning handsomely from its hierarchical [[ims|IMS]] database, was in no hurry to commercialize its own research — and the published System R papers were read closely by a young Larry Ellison, whose company shipped [[oracle|Oracle]] in 1979 as the first commercial SQL database. IBM's own commercial descendant, [[db2|Db2]], followed in 1983. Alongside Berkeley's independent [[ingres|Ingres]] project, System R settled the argument: the relational model won, and SQL became the standard.

## Additional Resources

- [A History and Evaluation of System R (1981 paper)](https://dl.acm.org/doi/10.1145/358769.358784)
