---
term: IMS
short: IBM's 1966 hierarchical database, built for the Apollo program — and still running in banks today.
---

**IMS** (Information Management System) is IBM's [[hierarchical-database|hierarchical database]], first delivered in 1966–68 and arguably the first commercial [[dbms|database management system]]. It was built with North American Rockwell for the **Apollo program**, tracking the millions of parts in the Saturn V rocket — a bill of materials being a natural tree: a rocket has stages, stages have assemblies, assemblies have parts.

## Method of use

IMS predates [[sql|SQL]] and the [[relational-model|relational model]] entirely. Data is a tree of parent and child segments, and programs **navigate** it with **DL/I** (Data Language/I) calls, typically from COBOL — every question is a program:

```cobol
* Retrieve the STAGE segment of rocket SATURN5, then its first child part
CALL 'CBLTDLI' USING GU, PCB-MASK, SEG-IO-AREA, ROCKET-SSA, STAGE-SSA.
CALL 'CBLTDLI' USING GNP, PCB-MASK, SEG-IO-AREA.
```

(`GU` = "get unique", `GNP` = "get next within parent" — you walk the tree hop by hop, exactly the navigational style the relational model was invented to replace.)

## Legacy

For tree-shaped data IMS was, and is, extremely fast and extraordinarily reliable — which is why, sixty years on, it still processes enormous transaction volumes in banks, insurers, and government agencies on IBM mainframes, often alongside its relational stablemate [[db2|Db2]]. Its rigidity for *unanticipated* questions is equally famous: it's the system whose limitations inspired Edgar Codd, an IBM mathematician, to propose the [[relational-model|relational model]] in 1970.

## Additional Resources

- [IBM IMS Documentation](https://www.ibm.com/docs/en/ims)
