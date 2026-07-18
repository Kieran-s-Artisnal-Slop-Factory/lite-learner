---
term: Relational model
short: Edgar Codd's 1970 idea of storing data as plain tables you query by description, not navigation.
---

In 1970, IBM mathematician Edgar F. Codd proposed describing data as plain
[[table|tables]] (mathematically, *relations*) and letting people ask *what* they
want rather than navigating pointers by hand.

Its radical part was *independence*: tables say nothing about how bytes sit on
disk, so storage can be reorganized for speed without breaking any query. Every
[[relational-database]] descends from this paper, and its query language became
[[sql]]. It replaced the older [[hierarchical-database|hierarchical]] and
[[network-database|network]] models.
