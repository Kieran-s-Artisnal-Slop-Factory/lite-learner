# Course 1: Beginner SQLite

**Goal:** Go from never having touched a database to comfortably exploring an existing SQLite database, writing queries, and performing basic CRUD operations.

## Chapter 1 — What is a Database?

**Topics**

* Why databases exist
* Structured vs unstructured data
* Tables, rows, columns
* Primary keys
* Relationships at a high level
* Real-world examples (contacts, library, movies)

**Exercises**

* Identify tables vs rows vs columns
* Explore a provided sample database
* Count rows in several tables
* Find a specific record

---

## Chapter 2 — SQL Fundamentals

**Topics**

* What SQL is
* SQL statements
* SQL keywords
* Case-insensitivity
* Comments
* SQLite shell basics
* Statement termination

**Exercises**

* Run first SQL statement
* Multiple statements
* Using comments
* Fix broken SQL syntax

---

## Chapter 3 — What Makes SQLite Different?

**Topics**

* SQLite architecture
* Single-file database
* Embedded library vs server databases
* SQLite vs PostgreSQL/MySQL
* Where SQLite excels
* Common use cases

**Exercises**

* Open an existing database
* Create a new database
* Observe file creation
* Explore database metadata

---

## Chapter 4 — Exploring an Existing Database

**Topics**

* Listing tables
* SQLite schema
* `sqlite_master`
* Table structure
* Data types
* Affinity
* NULL values

**Exercises**

* List all tables
* Find table definitions
* Inspect column types
* Identify primary keys
* Discover foreign keys

---

## Chapter 5 — Reading Data with SELECT

**Topics**

* Basic SELECT
* Selecting columns
* Selecting all columns
* Aliases
* DISTINCT
* LIMIT

**Exercises**

* Select all rows
* Select specific columns
* Rename output columns
* Return unique values
* Return first N rows

---

## Chapter 6 — Filtering Data

**Topics**

* WHERE
* Comparison operators
* Boolean logic
* IN
* BETWEEN
* LIKE
* IS NULL
* Pattern matching

**Exercises**

* Equality filtering
* Numeric ranges
* Text searches
* Multiple conditions
* NULL filtering
* Combine filters

---

## Chapter 7 — Sorting and Limiting Results

**Topics**

* ORDER BY
* ASC/DESC
* Multiple sort columns
* LIMIT
* OFFSET

**Exercises**

* Alphabetical sort
* Numeric descending
* Multi-column ordering
* Pagination
* Top-N queries

---

## Chapter 8 — Creating Tables

**Topics**

* CREATE TABLE
* Column types
* PRIMARY KEY
* Constraints overview
* Default values

**Exercises**

* Create first table
* Add multiple columns
* Create integer primary key
* Add defaults

---

## Chapter 9 — Modifying Data (CRUD)

### Create

**Topics**

* INSERT
* Multiple inserts
* NULL/default values

**Exercises**

* Insert one row
* Insert multiple rows
* Insert partial columns

### Read

Exercises combining everything learned.

### Update

**Topics**

* UPDATE
* WHERE safety
* Updating multiple rows

**Exercises**

* Update one row
* Bulk update
* Correct accidental update

### Delete

**Topics**

* DELETE
* Safe deletes
* Deleting all rows

**Exercises**

* Delete one row
* Delete matching rows
* Empty a table

---

## Chapter 10 — Relationships and Joins

**Topics**

* Why relationships exist
* Foreign keys (concept)
* INNER JOIN
* LEFT JOIN
* Understanding duplicated rows

**Exercises**

* Join two tables
* Join three tables
* LEFT JOIN missing data
* Display friendly reports
* Find unmatched rows

---

## Chapter 11 — Beginner Project

Build and query a small movie/library database.

**Exercises**

* Create schema
* Populate tables
* Query reports
* Update records
* Delete records
* Final mini assessment

---

# Course 2: Intermediate SQLite

**Goal:** Build reliable databases, understand performance, and write production-quality SQL.

---

## Chapter 1 — Idempotent Database Changes

**Topics**

* Why idempotency matters
* `CREATE TABLE IF NOT EXISTS`
* `DROP TABLE IF EXISTS`
* Safe schema updates
* Re-runnable scripts

**Exercises**

* Write reusable schema
* Convert unsafe script
* Make setup repeatable

---

## Chapter 2 — Constraints

**Topics**

* NOT NULL
* UNIQUE
* CHECK
* FOREIGN KEY
* DEFAULT

**Exercises**

* Add uniqueness
* Prevent invalid values
* Foreign key enforcement
* Default timestamps

---

## Chapter 3 — UPSERT and Conflict Handling

**Topics**

* INSERT OR IGNORE
* INSERT OR REPLACE
* ON CONFLICT
* UPSERT syntax
* Choosing the right approach

**Exercises**

* Ignore duplicates
* Replace rows
* Update existing records
* Inventory synchronization

---

## Chapter 4 — Transactions

**Topics**

* Atomicity
* BEGIN
* COMMIT
* ROLLBACK
* Savepoints

**Exercises**

* Successful transaction
* Rollback failure
* Multi-step updates
* Savepoint recovery

---

## Chapter 5 — Importing and Bulk Operations

**Topics**

* Large inserts
* Batch updates
* Performance considerations

**Exercises**

* Bulk import
* Batch update
* Batch delete

---

## Chapter 6 — Indexes

**Topics**

* Why indexes exist
* B-tree overview
* Single-column indexes
* Composite indexes
* Covering indexes
* When *not* to index

**Exercises**

* Create index
* Composite index
* Remove unnecessary index
* Compare query plans

---

## Chapter 7 — Query Planning

**Topics**

* `EXPLAIN QUERY PLAN`
* Table scans
* Index usage
* Reading execution plans

**Exercises**

* Interpret plans
* Improve slow queries
* Add missing indexes

---

## Chapter 8 — Intermediate Project

Design a small inventory/order system.

**Exercises**

* Schema
* Constraints
* Transactions
* Upserts
* Index optimization

---

# Course 3: Advanced SQLite

**Goal:** Learn SQLite features used in production systems and understand how SQLite works internally.

---

## Chapter 1 — PRAGMAs

**Topics**

* What PRAGMAs are
* Database settings
* Runtime vs persistent PRAGMAs
* Useful PRAGMAs

  * foreign_keys
  * journal_mode
  * synchronous
  * cache_size
  * integrity_check
  * table_info

**Exercises**

* Inspect settings
* Enable foreign keys
* Check integrity
* Compare modes

---

## Chapter 2 — Common Table Expressions (CTEs)

**Topics**

* WITH
* Multiple CTEs
* Recursive CTEs
* Readability

**Exercises**

* Simple CTE
* Multi-step query
* Recursive tree
* Number generator

---

## Chapter 3 — Views

**Topics**

* CREATE VIEW
* Updating through views
* Reusable reports
* When to use views

**Exercises**

* Create report view
* Query views
* Replace duplicated SQL

---

## Chapter 4 — Triggers

**Topics**

* BEFORE
* AFTER
* INSERT
* UPDATE
* DELETE
* Auditing
* Automatic timestamps

**Exercises**

* Audit log
* Updated timestamp
* Validation trigger
* Cascading behavior

---

## Chapter 5 — WAL Mode and Concurrency

**Topics**

* Journal modes
* WAL internals
* Readers vs writers
* Checkpointing
* Tradeoffs

**Exercises**

* Enable WAL
* Observe journal changes
* Compare modes

---

## Chapter 6 — Extensions

**Topics**

* Loadable extensions
* Built-in extensions
* JSON1
* FTS5
* RTree
* Security considerations

**Exercises**

* JSON queries
* Full-text search
* Spatial index demo

---

## Chapter 7 — Aggregation and Analytics

**Topics**

* COUNT
* SUM
* AVG
* MIN/MAX
* GROUP BY
* HAVING
* Window function introduction

**Exercises**

* Sales totals
* Category summaries
* Running totals
* Rankings

---

## Chapter 8 — Query Optimization

**Topics**

* ANALYZE
* sqlite_stat tables
* Statistics
* Planner decisions
* Optimizing joins
* Measuring improvements

**Exercises**

* Run ANALYZE
* Compare plans
* Improve a slow report

---

## Chapter 9 — Advanced Schema Design

**Topics**

* Normalization
* Denormalization
* Composite primary keys
* WITHOUT ROWID
* Generated columns
* Choosing data types

**Exercises**

* Normalize schema
* Add generated column
* Composite keys
* WITHOUT ROWID comparison

---

## Chapter 10 — Final Capstone

Build a production-style application database (e.g. task tracker, bookstore, or media library) using nearly every feature learned.

**Exercises**

* Design complete schema
* Add constraints
* Populate realistic data
* Create indexes
* Build views
* Write CTE reports
* Add triggers
* Enable WAL
* Optimize with ANALYZE
* Final comprehensive reporting challenge
