# Instructor Guide

How to author a course for lite-learner. Everything is markdown — no code
changes needed. You write folders of markdown files, run a build, and deploy
the output to any static host.

## The layout: one folder per course, one per chapter

Content lives under `src/content/courses/`. Each course is a folder, each
chapter a sub-folder, and each lesson a markdown file inside a chapter. The
`index.md` at each level *is* that course's or chapter's main page:

```
src/content/courses/
  sqlite-basics/                    ← a COURSE
    index.md                        ← the course page
    what-is-a-database/             ← a CHAPTER
      index.md                      ← the chapter page
      tables-rows-and-columns.md    ← a LESSON
      count-rows.md                 ← another lesson
    reading-data-with-select/
      index.md
      select-everything.md
      ...
  intermediate-sqlite/
    index.md
    ...
```

Lesson files can be named anything (except `index`, which is reserved for the
chapter page). Names only need to be unique **within their folder** — two
chapters can both have a `schema.md`. The folder path is the identity:
`sqlite-basics/beginner-project/schema` and
`intermediate-sqlite/intermediate-project/schema` are different lessons, and
the path is also the URL
(`/courses/sqlite-basics/beginner-project/schema/`).

Moving or deleting a chapter is a folder operation — everything it owns goes
with it.

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

There is one kind of file — a **lesson** — and what it declares decides how
it behaves:

| Frontmatter                        | Kind     | The learner gets                                        |
| ---------------------------------- | -------- | ------------------------------------------------------- |
| `desired_state` (+ `initial_sql`)  | exercise | editor, Run, **Check solution**; completes on a passing check |
| `initial_sql` only                 | reading  | prose + an explorable database (editor, Run, DB viewer) and **Mark as read** |
| neither                            | reading  | prose only, with **Mark as read**                        |

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

To check a solution, the app runs `desired_state.query` against the
learner's current database and compares the result to `desired_state.rows`.
Two rules shape everything you write here:

1. **The check inspects database state, not the learner's SQL.** You cannot
   verify *how* they did something, only what the database looks like
   afterwards.
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

### Checking schema (table structure)

Use `pragma_table_info` to verify a table's shape, e.g. for a
`CREATE TABLE` exercise:

```yaml
desired_state:
  query: "SELECT name, type, pk FROM pragma_table_info('users') ORDER BY cid;"
  rows:
    - { name: "id", type: "INTEGER", pk: 1 }
    - { name: "name", type: "TEXT", pk: 0 }
```

(Prefer `SELECT ... FROM pragma_table_info(...) ORDER BY cid` over a bare
`PRAGMA` so the ORDER BY rule holds.)

### Making read-only tasks checkable

Because the check is state-based, a pure `SELECT` exercise would pass without
the learner doing anything. Give read tasks a verifiable side effect — have
learners save their query as a table:

```sql
CREATE TABLE adults AS SELECT name FROM users WHERE age >= 18 ORDER BY name;
```

and then check `SELECT name FROM adults ORDER BY name;`. (Or, if there's
nothing to verify, make it a reading lesson instead.)

### How values are compared

The *expected* value's type drives the comparison:

| Expected (YAML)  | Matches when…                                                        |
| ---------------- | -------------------------------------------------------------------- |
| `null`           | the result is SQL `NULL` (or the column is absent)                   |
| integer (`21`)   | the result is exactly that number (INTEGER or REAL)                  |
| decimal (`0.5`)  | the result is within `1e-9` (floating-point tolerance)               |
| `true` / `false` | the result is `1` / `0` (SQLite has no boolean type)                 |
| string           | the result is exactly that TEXT — case-sensitive, no trimming, and no number↔string coercion (`"21"` does **not** match the integer `21`) |

BLOBs are not supported. Integers beyond 2^53 are out of scope.

### Solutions are public

The whole site is static, so `desired_state` ships to the browser and a
curious learner can read the answer. That's by design — this is a learning
tool, not an accredited assessment.

## Previewing and validating

```sh
npm run dev      # live preview at http://localhost:4321
npm run build    # full validation + static output in dist/
```

The build validates everything: frontmatter against the schemas (a
`desired_state` without `initial_sql`, missing `title`, …), listed children
that don't exist, and orphaned files nothing lists.

To hand-test an exercise, open it in the dev server, write the intended
solution, run it, and press **Check solution**. Also try the wrong-but-close
solutions you expect from learners to make sure they *fail*.

## Renaming and updating content

Learner progress is stored in the browser, keyed by the content's **path**
(`course/chapter/lesson`), next to a cached copy of the content. On each
visit the app compares a content hash and refreshes stale cached content
**without touching progress** — so:

- **Editing a file** (title, instructions, even `initial_sql` or
  `desired_state`) is safe. Redeploy and every visitor picks up the new
  content while keeping their completion state.
- **Renaming or moving a file/folder** changes the path, which makes it a
  *different* lesson/chapter/course: visitors lose their progress for it.
  Avoid renaming published content; fix wording via `title` instead, which is
  display-only.

## Deploying

```sh
npm run build
```

Upload `dist/` to any static host — GitHub Pages, Netlify, Cloudflare Pages,
or a plain file server. No special headers or server config are required.
For subpath deploys (e.g. GitHub Pages under `/repo/`), set
[`base`](https://docs.astro.build/en/reference/configuration-reference/#base)
in `astro.config.mjs`; the service worker picks it up automatically.

After a redeploy, returning visitors get the new content on their next
online visit (the service worker is network-first for pages); offline
visitors keep working against their cached copy.
