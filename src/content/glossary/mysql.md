---
term: MySQL
short: The open-source relational database that powered the early web, still one of the most deployed servers.
---

[MySQL](https://www.mysql.com/) is an open-source relational database management system ([[relational-database|RDBMS]]) that runs as a dedicated server, like [[postgresql|PostgreSQL]] and unlike the embedded [[sqlite|SQLite]]. Applications connect to it over a network, send [[sql|SQL]] queries, and rely on it for [[transaction|transactions]], [[access-control|access control]], replication, and [[concurrency|concurrent]] multi-user access.

## Features & Architecture

MySQL follows a classic client-server design with a pluggable storage-engine layer: the same SQL front end can sit on top of different engines, with **InnoDB** (transactional, crash-safe, row-locking) being the default for decades. It is known for being easy to set up, fast for read-heavy web workloads, and extremely well documented, which made it the default database of the early web. Replication is a particular strength — read replicas and primary/replica topologies are simple to configure, and much of the web still scales reads this way.

## History

MySQL was released in 1995 by the Swedish company MySQL AB and became the "M" in the famous **LAMP** stack (Linux, Apache, MySQL, PHP) that powered a huge share of the early internet, including the original Facebook, Wikipedia, and WordPress. Sun Microsystems acquired MySQL AB in 2008, and Oracle acquired Sun in 2010. Concerns about Oracle's stewardship led MySQL's original author, Michael "Monty" Widenius, to fork it as **MariaDB**, which remains largely compatible. Both continue to be among the most widely deployed database servers in the world.

## Additional Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [MySQL Tutorial](https://dev.mysql.com/doc/refman/en/tutorial.html)
