---
title: "The relational model"
---

In 1970, an IBM mathematician named **Edgar F. Codd** published a paper with
a dry title and a revolutionary idea: *"A Relational Model of Data for Large
Shared Data Banks."*

Codd's proposal: stop storing data as pointer mazes that programs must
navigate. Describe it instead as plain **tables** — he used the mathematical
term *relations* — and let people ask questions about *what* they want,
leaving the system to figure out *how* to fetch it. The two ideas you've
spent this course absorbing — everything is tables, and you ask rather than
navigate — both come straight from that paper.

The radical part was **independence**: tables say nothing about how bytes
are arranged on disk. The database could reorganize storage for speed,
without breaking a single question anyone had ever written. That severed
exactly the weld — data fused to access paths — that made the old systems so
rigid.

## From paper to product

IBM, earning handsomely from IMS, wasn't eager to disrupt itself, and
Codd's idea also drew genuine skepticism — could something so abstract ever
be *fast*? Two 1970s projects answered yes:

- **System R** (IBM Research) proved relational could perform, and invented
  a query language for it: **SEQUEL**, later shortened to **SQL**.
- **Ingres** (UC Berkeley) proved it independently, and its lineage led
  directly to today's PostgreSQL — the name literally means "post-Ingres".

A sharp-eyed engineer named Larry Ellison read the System R papers and beat
IBM to market: his company shipped **Oracle** in 1979, the first commercial
SQL database, and IBM's own **Db2** followed in 1983. SQL was standardized
in 1986, cementing the learn-once-use-anywhere portability that still holds
today. Codd received the Turing Award in 1981.

## Relational everywhere

Through the 80s and 90s relational databases became simply *the* database —
the assumed substrate of business software. Then open source made them free
(**MySQL**, 1995, powering the early web; **PostgreSQL** maturing into the
engineer's favourite), and in 2000 **SQLite** shrank a full relational
database into a tiny library that applications embed directly. SQLite now
ships in every smartphone, browser, and countless devices — billions of
copies, quite possibly the most deployed software component ever, and the
database you'll use hands-on in the next course.

For three decades the relational model had no serious challenger. What
finally bent it wasn't a better theory — it was the sheer, planetary scale
of the web.
