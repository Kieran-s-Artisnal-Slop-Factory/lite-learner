---
term: SQLite
short: The most used database in the world, simple, embedable, reliable.
---

[SQLite](https://sqlite.org/index.html) is a lightweight, open-source relational database management system ([[relational-database|RDBMS]]) designed to be embedded directly into applications rather than run as a separate database server. Unlike traditional database systems such as [[postgresql|PostgreSQL]] or MySQL, [SQLite](https://sqlite.org/index.html) stores an entire database—including its tables, indexes, and data—in a single ordinary file on disk. Applications interact with the database by linking against the [SQLite](https://sqlite.org/index.html) library, eliminating the need to install, configure, or manage a database server. This simplicity, combined with its reliability and standards-compliant SQL implementation, has made [SQLite](https://sqlite.org/index.html) one of the most widely deployed database engines in the world.

## Features & Architecture

The defining characteristic of [SQLite](https://sqlite.org/index.html) is its file-based architecture. Instead of running as a standalone database server that accepts connections from multiple clients over a network, [SQLite](https://sqlite.org/index.html) operates directly on a database file that is accessed by the application itself. This makes it extremely easy to distribute, back up, and deploy—copying a [SQLite](https://sqlite.org/index.html) database is as simple as copying a single file. While [SQLite](https://sqlite.org/index.html) supports multiple readers and carefully coordinated writes, it is optimized for applications with relatively low write concurrency. In contrast, server-based databases such as [[postgresql|PostgreSQL]] or MySQL are designed to support many simultaneous users, remote connections, and advanced features such as user management, replication, and clustering.

One interesting difference compared to other systems is how [SQLite](https://sqlite.org/index.html) approaches running. [SQLite](https://sqlite.org/index.html) is closer to a programming language than a more traditional database system. It runs a virtual machine and when queries are made the parser takes the SQL anc ompiles it to it's own [bytecode](https://en.wikipedia.org/wiki/Bytecode) language (called [VDBE](https://sqlite.org/vdbe.html)). Making each database more of it's own application

## Extensions

Although [SQLite](https://sqlite.org/index.html) is intentionally minimal, it is highly extensible. Developers can load extensions that add new SQL functions, aggregate functions, virtual tables, and custom data types. Popular extensions include FTS5 for full-text search, R-Tree for efficient spatial indexing, JSON1 for querying and manipulating JSON documents, and the newer Vector extensions for similarity search over machine learning embeddings. Applications can also register their own functions and virtual tables in C, C++, Rust, Python, and other languages, allowing [SQLite](https://sqlite.org/index.html) to be customized for specialized workloads while retaining its simple deployment model.

## History

[SQLite](https://sqlite.org/index.html) was created in 2000 by D. Richard Hipp to provide a reliable, self-contained database that required zero administration. It was originally developed as a replacement for an ad hoc data storage system in a U.S. Navy project, where a server-based database was impractical. Since then, [SQLite](https://sqlite.org/index.html) has become ubiquitous, powering billions of devices and applications, including smartphones, web browsers, operating systems, embedded devices, desktop applications, and countless mobile apps. Its small footprint, high performance, and public domain licensing have contributed significantly to its widespread adoption.

## Additional Resources

- [The Code Inside Everything (That Gets Zero Credit)](https://www.youtube.com/watch?v=lSVgeMoXJTs)
- [SQLite Quickstart](https://sqlite.org/quickstart.html)
- [SQLite Architecture](https://sqlite.org/arch.html)
- [SQLite will finally make sense after this video](https://www.youtube.com/watch?v=IWSDTqbF32Y) 
