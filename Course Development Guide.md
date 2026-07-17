# Course Development Guide

How to author content for Lite Learner. Everything is markdown — no code
changes needed. You write folders of markdown files, run a build, and deploy
the output to any static host.

## Contents

- [The layout](#the-layout-one-folder-per-course-one-per-chapter)
- [Ordering](#ordering-the-parent-lists-its-children)
- [Lessons: exercise or reading](#lessons-exercise-or-reading)
- [Writing `desired_state`](#writing-desired_state)
- [Tips & tricks for tougher solutions](#tips--tricks-for-tougher-solutions)
- [Previewing and validating](#previewing-and-validating)
- [Renaming and updating content](#renaming-and-updating-content)
- [Deploying](#deploying)
- [The shipped courses](#the-shipped-courses)

## The layout: one folder per course, one per chapter

Content lives under `src/content/courses/`. Each course is a folder, each
chapter a sub-folder, and each lesson a markdown file inside a chapter. The
`index.md` at each level *is* that course's or chapter's main page:

```
src/content/courses/
  1.intro-to-databases/             ← a COURSE ("1." orders the listing)
    index.md                        ← the course page
    ...
  2.sqlite-basics/                  ← the next course
    index.md
    what-is-a-database/             ← a CHAPTER
      index.md                      ← the chapter page
      tables-rows-and-columns.md    ← a LESSON
      count-rows.md                 ← another lesson
    reading-data-with-select/
      index.md
      select-everything.md
      ...
```

Lesson files can be named anything (except `index`, which is reserved for the
chapter page). Names only need to be unique **within their folder** — two
chapters can both have a `schema.md`. The folder path is the identity:
`sqlite-basics/beginner-project/schema` and
`intermediate-sqlite/intermediate-project/schema` are different lessons, and
the path is also the URL (`/courses/sqlite-basics/beginner-project/schema/`).

Moving or deleting a chapter is a folder operation — everything it owns goes
with it.

### Course order: numeric folder prefixes

Courses have no parent to list them, so the **course listing follows the
folder name** (natural sort). Prefix course folders with `N.` to put them in
teaching order: `1.intro-to-databases`, `2.sqlite-basics`, ….

The prefix is **stripped from the id** — the URL is
`/courses/intro-to-databases/` and learner progress is keyed without it — so
renumbering courses later never breaks links or wipes progress. One caveat:
because prefixes vanish from ids, two folders whose names differ only by
prefix (`1.foo` and `2.foo`) would collide; don't do that.

## Ordering: the parent lists its children

Order lives in the parent's frontmatter, as plain relative names — a course
lists its chapter **folder names**, a chapter lists its lesson **file names**
(minus `.md`). **Array order is the order**; there is no `order` field.

```markdown
<!-- sqlite-basics/index.md (a COURSE) -->
---
title: Beginner SQLite
chapters:
  - what-is-a-database
  - sql-fundamentals
---

The course description, in markdown. The first paragraph doubles as the
blurb on the course listing page, so front-load the pitch.
```

```markdown
<!-- sqlite-basics/what-is-a-database/index.md (a CHAPTER) -->
---
title: What is a Database?
lessons:
  - tables-rows-and-columns
  - count-rows
  - find-record
---

The chapter description. It renders on the chapter's own page, and its text
is also shown on the course page inside the chapter's card — keep the
opening line strong.
```

Two rules the build enforces (`npm run build` fails with a pointed error):

- **Listing something that doesn't exist** — a `chapters:` or `lessons:`
  entry with no matching folder/file.
- **Orphans** — a chapter folder or lesson file that exists but is not listed
  by its parent. Every file must be wired in, so nothing silently disappears.
  (Keep drafts outside `src/content/` until they're ready.)

## Lessons: exercise or reading

There is one kind of file — a **lesson** — and what it declares decides how it
behaves:

| Frontmatter                       | Kind     | The learner gets                                                             |
| --------------------------------- | -------- | ---------------------------------------------------------------------------- |
| `desired_state` (+ `initial_sql`) | exercise | editor, Run, **Check solution**; completes on a passing check                |
| `initial_sql` only                | reading  | prose + an explorable database (editor, Run, DB viewer) and **Mark as read** |
| neither                           | reading  | prose only, with **Mark as read**                                            |

A reading lesson counts toward chapter/course completion exactly like an
exercise — "Mark as read" stamps it complete. Use readings for concepts that
don't need a checkable task (what a table is, how WAL works), optionally with
a seeded database to poke at.

### An exercise lesson

```markdown
<!-- sqlite-basics/what-is-a-database/count-rows.md -->
---
title: "Rows are records: counting them"
initial_sql: |
  CREATE TABLE movies (id INTEGER PRIMARY KEY, title TEXT);
  INSERT INTO movies (title) VALUES ('Inception'), ('Parasite');
desired_state:
  query: "SELECT movie_count FROM answer;"
  rows:
    - { movie_count: 2 }
---

The lesson instructions, in full markdown. Fenced ```sql blocks are
syntax-highlighted. End with a clearly marked "## Your task" section.
```

- **`initial_sql`** seeds a fresh in-memory database every time the lesson
  loads (and on Reset). It doesn't need to be idempotent — it always runs
  against a blank database.
- **`desired_state`** is the embedded solution check (next section). A lesson
  that declares `desired_state` must also declare `initial_sql` (the build
  enforces it).

### A reading lesson

```markdown
<!-- sqlite-basics/what-is-a-database/tables-rows-and-columns.md -->
---
title: "Tables, rows, and columns"
initial_sql: |
  CREATE TABLE movies (id INTEGER PRIMARY KEY, title TEXT, year INTEGER);
  INSERT INTO movies (title, year) VALUES ('Inception', 2010), ('Parasite', 2019);
---

A **table** is like a named spreadsheet… poke at the `movies` table below.
```

Same file shape — it's a reading page simply because no solution is declared.
Drop `initial_sql` too and it's pure prose.

## Writing `desired_state`

To check a solution, the app runs `desired_state.query` against the learner's
current database and compares the result to `desired_state.rows`. Two rules
shape everything you write here:

1. **The check inspects database state, not the learner's SQL.** You can only
   verify what the database looks like afterwards, not *how* they got there.
2. **Comparison is positional.** Result row 1 is compared to expected row 1,
   and the row count must match exactly — so **every query must have an
   explicit `ORDER BY`** to make the order deterministic.

### Checking query results

```yaml
desired_state:
  query: "SELECT age FROM users ORDER BY age;"
  rows:
    - { age: 21 }
    - { age: 30 }
```

Only the columns you list are compared — extra columns in the result are
ignored, which lets you check just the fields that matter.

### How values are compared

The *expected* value's type drives the comparison:

| Expected (YAML)  | Matches when…                                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `null`           | the result is SQL `NULL` (or the column is absent)                                                                                        |
| integer (`21`)   | the result is exactly that number (INTEGER or REAL)                                                                                        |
| decimal (`0.5`)  | the result is within `1e-9` (floating-point tolerance)                                                                                     |
| `true` / `false` | the result is `1` / `0` (SQLite has no boolean type)                                                                                       |
| string           | the result is exactly that TEXT — case-sensitive, no trimming, and no number↔string coercion (`"21"` does **not** match the integer `21`) |

BLOBs are not supported. Integers beyond 2^53 are out of scope.

### Solutions are public

The whole site is static, so `desired_state` ships to the browser and a
curious learner can read the answer. That's by design — this is a learning
tool, not an accredited assessment.

## Tips & tricks for tougher solutions

The "check the database, not the SQL" model is simple for `SELECT`-style
tasks, but a lot of lessons teach things that don't naturally return rows —
creating tables, indexes, triggers, constraints, PRAGMAs. The trick is almost
always to **write a query that turns the thing you want to verify into rows**,
then compare those. SQLite's own catalog and `pragma_*` table-valued functions
are your toolkit.

### Making read-only tasks checkable

A pure `SELECT` exercise would pass without the learner doing anything, since
the seeded database already satisfies it. Give read tasks a verifiable side
effect — have learners save their query as a table:

```sql
CREATE TABLE adults AS SELECT name FROM users WHERE age >= 18 ORDER BY name;
```

and then check `SELECT name FROM adults ORDER BY name;`. (Or, if there's truly
nothing to verify, make it a reading lesson instead.)

### Verifying a table's schema

Use `pragma_table_info(<table>)` to turn a table's structure into rows. Prefer
the table-valued function over a bare `PRAGMA` so you can add `ORDER BY`:

```yaml
desired_state:
  query: "SELECT name, type, pk FROM pragma_table_info('users') ORDER BY cid;"
  rows:
    - { name: "id", type: "INTEGER", pk: 1 }
    - { name: "name", type: "TEXT", pk: 0 }
```

`pragma_table_info` columns: `cid`, `name`, `type`, `notnull`, `dflt_value`,
`pk`. Select just the ones the exercise is about (e.g. only `notnull` for a
`NOT NULL` lesson) so unrelated details don't make the check brittle.

### Verifying that an object exists (tables, indexes, views, triggers)

`sqlite_master` (aka `sqlite_schema`) has one row per schema object. It's the
go-to for "did the learner create X":

```sql
-- All user tables in the database
SELECT tbl_name FROM sqlite_master WHERE type = 'table' ORDER BY name;

-- Did they create the expected index? (filter out auto-created sqlite_* ones)
SELECT name FROM sqlite_master
WHERE type = 'index' AND name NOT LIKE 'sqlite_%'
ORDER BY name;
```

`type` is one of `table`, `index`, `view`, `trigger`. Filtering
`name NOT LIKE 'sqlite_%'` drops SQLite's internal objects so the learner's
work is all that remains. You can also check the object's stored definition via
the `sql` column when *how* it was declared matters.

### Verifying data changes (INSERT / UPDATE / DELETE)

Just query the affected rows back with an `ORDER BY`, selecting the columns
that should have changed:

```yaml
desired_state:
  query: "SELECT name, active FROM users ORDER BY id;"
  rows:
    - { name: "Alice", active: false }
    - { name: "Bob", active: true }
```

For a DELETE, assert the survivors (and remember: an empty `rows: []` asserts
the table is empty).

### Verifying settings and counts

PRAGMAs that return a value can be selected directly, and aggregates collapse
a whole table into one checkable number:

```sql
SELECT foreign_keys FROM pragma_foreign_keys;   -- 1 after PRAGMA foreign_keys = ON
SELECT COUNT(*) AS n FROM orders;               -- becomes { n: <count> }
```

### General advice

- **Always `ORDER BY`.** Without it, row order is undefined and a correct
  solution can fail intermittently.
- **Check the minimum.** Select only the columns that prove the task is done;
  extra columns are ignored, but selecting them invites brittleness.
- **Test the failure cases.** In the dev server, run not just the intended
  solution but the wrong-but-close attempts you expect from learners, and make
  sure they *fail*. State-based checking means an unexpected shortcut can pass.

## Previewing and validating

```sh
npm run dev      # live preview; Astro prints the URL
npm run build    # full validation + static output in dist/
```

The build validates everything: frontmatter against the schemas (a
`desired_state` without `initial_sql`, a missing `title`, …), listed children
that don't exist, and orphaned files nothing lists.

To hand-test an exercise, open it in the dev server, write the intended
solution, run it, and press **Check solution**.

## Renaming and updating content

Learner progress is stored in the browser, keyed by the content's **path**
(`course/chapter/lesson`), next to a cached copy of the content. On each visit
the app compares a content hash and refreshes stale cached content **without
touching progress** — so:

- **Editing a file** (title, instructions, even `initial_sql` or
  `desired_state`) is safe. Redeploy and every visitor picks up the new content
  while keeping their completion state.
- **Renaming or moving a file/folder** changes the path, which makes it a
  *different* lesson/chapter/course: visitors lose their progress for it.
  Avoid renaming published content; fix wording via `title` instead, which is
  display-only.

## Deploying

```sh
npm run build
```

Upload `dist/` to any static host — GitHub Pages, Netlify, Cloudflare Pages, or
a plain file server. No special headers or server config are required. For
sub-path deploys (e.g. GitHub Pages under `/repo/`), set
[`base`](https://docs.astro.build/en/reference/configuration-reference/#base)
in `astro.config.mjs`; the service worker and internal links pick it up
automatically.

After a redeploy, returning visitors get the new content on their next online
visit (the service worker is network-first for pages); offline visitors keep
working against their cached copy.

## The shipped courses

Four courses ship in `src/content/courses/`. Extend or replace them freely —
this is the intended progression:

### Introduction to Databases (`intro-to-databases`)

A reading-only, **database-agnostic** primer for people without a technical
background — no exercises, every lesson is a "Mark as read" page. It mentions
SQLite but isn't about it, so it can be reused in front of future courses
about PostgreSQL or other databases.

1. What is a Database? — spreadsheets → tables, a simple database, relations
   (relational vs non-relational), the types of databases (relational,
   columnar, key-value, document, graph, vector, time-series)
2. Why use Databases? — where spreadsheets stop scaling, joins (ask for
   exactly what you need), multi-user security & concurrency, query languages
3. History of Databases — the first navigational systems (IMS, CODASYL),
   Codd and the relational model, the NoSQL movement and today's landscape

### Beginner SQLite (`sqlite-basics`)

From never having touched a database to comfortably exploring one, querying it,
and doing basic CRUD.

1. What is a Database? — tables, rows, columns, primary keys
2. SQL Fundamentals — statements, keywords, comments, termination
3. What Makes SQLite Different? — single-file, embedded vs server
4. Exploring an Existing Database — `sqlite_master`, schema, types, NULLs
5. Reading Data with `SELECT` — columns, aliases, `DISTINCT`, `LIMIT`
6. Filtering Data — `WHERE`, `IN`, `BETWEEN`, `LIKE`, `IS NULL`
7. Sorting and Limiting — `ORDER BY`, `OFFSET`, top-N, pagination
8. Creating Tables — `CREATE TABLE`, types, `PRIMARY KEY`, defaults
9. Modifying Data (CRUD) — `INSERT`, `UPDATE`, `DELETE`
10. Relationships and Joins — foreign keys, `INNER`/`LEFT JOIN`
11. Beginner Project — build and query a small movie/library database

### Intermediate SQLite (`intermediate-sqlite`)

Build reliable databases and write production-quality SQL.

1. Idempotent Database Changes — `IF NOT EXISTS`, re-runnable scripts
2. Constraints — `NOT NULL`, `UNIQUE`, `CHECK`, `FOREIGN KEY`, `DEFAULT`
3. UPSERT and Conflict Handling — `INSERT OR IGNORE/REPLACE`, `ON CONFLICT`
4. Transactions — atomicity, `BEGIN`/`COMMIT`/`ROLLBACK`, savepoints
5. Importing and Bulk Operations — batch insert/update/delete
6. Indexes — single-column, composite, covering, when *not* to index
7. Query Planning — `EXPLAIN QUERY PLAN`, scans vs index usage
8. Intermediate Project — an inventory/order system tying it together

### Advanced SQLite (`advanced-sqlite`)

Production features and how SQLite works internally.

1. PRAGMAs — settings, `foreign_keys`, `journal_mode`, `integrity_check`
2. Common Table Expressions — `WITH`, multiple and recursive CTEs
3. Views — `CREATE VIEW`, reusable reports
4. Triggers — `BEFORE`/`AFTER`, auditing, validation, cascades
5. WAL Mode and Concurrency — journal modes, checkpointing, tradeoffs
6. Extensions — JSON1, FTS5, RTree
7. Aggregation and Analytics — `GROUP BY`, `HAVING`, window functions
8. Query Optimization — `ANALYZE`, statistics, optimizing joins
9. Advanced Schema Design — normalization, `WITHOUT ROWID`, generated columns
10. Final Capstone — a production-style database using nearly everything
