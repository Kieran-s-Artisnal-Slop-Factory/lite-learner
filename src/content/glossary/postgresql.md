---
term: PostgreSQL
short: One of the most deployed, reliable, and performant relational databases. 
---

[PostgreSQL](https://www.postgresql.org/) is a powerful, open-source relational database management system ([[relational-database|RDBMS]]) designed for reliability, extensibility, and standards compliance. Unlike embedded databases such as [[sqlite|SQLite]], [PostgreSQL](https://www.postgresql.org/) runs as a dedicated database server that manages data independently of the applications that use it. Applications connect to the server over a local or network connection, allowing many users and programs to access the same database simultaneously. [PostgreSQL](https://www.postgresql.org/) supports a comprehensive implementation of SQL along with advanced features such as transactions, views, stored procedures, triggers, and sophisticated indexing methods, making it suitable for everything from small web applications to large enterprise systems.

## Features & Architecture

One of [PostgreSQL](https://www.postgresql.org/)'s defining characteristics is its client-server architecture. The database runs as a separate service that manages storage, security, and concurrent access, while applications connect using database clients or drivers. This architecture enables [PostgreSQL](https://www.postgresql.org/) to efficiently handle hundreds or thousands of concurrent users, provide fine-grained user permissions, perform automatic crash recovery, and support features such as replication, backups, and high availability. While this makes [PostgreSQL](https://www.postgresql.org/) more complex to install and administer than a file-based database like [[sqlite|SQLite]], it also makes it far better suited to multi-user applications, large datasets, and systems requiring high performance under heavy workloads.

## Extensions

[PostgreSQL](https://www.postgresql.org/) is also renowned for its extensibility. Developers can create custom data types, operators, functions, and indexing methods, and install extensions that significantly expand the database's capabilities. Popular extensions include PostGIS for geographic information systems (GIS), pgvector for storing and searching AI and machine learning embeddings, TimescaleDB for time-series data, and pg_cron for scheduling recurring database jobs. This rich extension ecosystem allows [PostgreSQL](https://www.postgresql.org/) to support a wide range of workloads beyond traditional relational databases, including geospatial applications, analytics, time-series monitoring, and modern AI-powered systems.

## History

Originally developed in the 1980s as the POSTGRES research project at the University of California, Berkeley under Professor Michael Stonebraker, [PostgreSQL](https://www.postgresql.org/) evolved from academic research into one of the world's most respected open-source databases. The project was later extended to support SQL, becoming [PostgreSQL](https://www.postgresql.org/) in 1996. Today, it is maintained by a large international community of contributors and is trusted by organizations ranging from startups to major technology companies, financial institutions, and government agencies. Its reputation for stability, correctness, and feature completeness has made it one of the most popular relational database systems available.

## Additional Resources

- [How PostgresQL quietly took over](https://www.youtube.com/watch?v=0hD4K3Ab3Fc)
- [The Database That Should Be Dead but Runs the Internet](https://www.youtube.com/watch?v=_CB_Aa2ODeM)
- [I replaced my entire tech stack with Postgres...](https://www.youtube.com/watch?v=3JW732GrMdg)
- [Just use Postgres with Denis Magda](https://www.youtube.com/watch?v=IdyK8XB2l6g)
