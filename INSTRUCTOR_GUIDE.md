# Instructor Guide

How to author a course for lite-learner. Everything is markdown — no code
changes needed. You write three kinds of files, run a build, and deploy the
output to any static host.

## The three content collections

Content lives under `src/content/`, one folder per collection:

```
src/content/
├── courses/     one file per course
├── chapters/    one file per chapter
└── exercises/   one file per exercise
```

Every file is markdown with YAML frontmatter. The **filename (minus `.md`) is
the slug** — it appears in URLs and is the stable identity of the entry, so
pick it carefully (see [Renaming and updating content](#renaming-and-updating-content)).

The hierarchy is wired top-down: a course lists its chapters, a chapter lists
its exercises. **Array order is the order** — there is no separate
`order`/`sequence` field. Reordering chapters or exercises means reordering
the array.

### Courses — `src/content/courses/<slug>.md`

```markdown
---
title: SQLite Basics
chapters:
  - creating-a-table
  - creating-and-querying-content
---

The course description, in markdown. The first paragraph doubles as the
blurb on the course listing page, so front-load the pitch.
```

### Chapters — `src/content/chapters/<slug>.md`

```markdown
---
title: Creating a Table
exercises:
  - create-table
  - create-table-if-not-exists
---

A short chapter description. It is shown on the course page inside the
chapter's card — one or two sentences with `inline code` works best
(block markdown like headings or code fences won't render there).
```

### Exercises — `src/content/exercises/<slug>.md`

```markdown
---
title: "Creating a table with CREATE TABLE"
initial_sql: |
  CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER
  );
desired_state:
  query: "SELECT name, age FROM users ORDER BY name;"
  rows:
    - { name: "Alice", age: 30 }
    - { name: "Bob", age: 21 }
---

The exercise instructions, in full markdown. Fenced ```sql blocks are
syntax-highlighted. End with a clearly marked "## Your task" section that
states exactly what the learner must produce.
```

- **`initial_sql`** seeds a fresh in-memory database every time the exercise
  loads (and on Reset). It doesn't need to be idempotent — it always runs
  against a blank database. If the exercise should start from nothing, use a
  SQL comment (`-- The database starts empty.`) rather than an empty string.
- **`desired_state`** is the embedded solution check (next section).

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
    - { name: "age", type: "INTEGER", pk: 0 }
```

(Prefer `SELECT ... FROM pragma_table_info(...) ORDER BY cid` over a bare
`PRAGMA` so the ORDER BY rule holds.)

### Making read-only tasks checkable

Because the check is state-based, a pure `SELECT` exercise would pass without
the learner doing anything. Give read tasks a verifiable side effect — the
example course has learners save their query as a table:

```sql
CREATE TABLE adults AS SELECT name FROM users WHERE age >= 18 ORDER BY name;
```

and then checks `SELECT name FROM adults ORDER BY name;`.

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

The build validates everything:

- frontmatter is checked against the schemas (missing `title`, malformed
  `desired_state`, etc. fail the build with a pointer to the file)
- **references are checked** — a course listing a chapter slug that doesn't
  exist (or a chapter listing a missing exercise) fails the build, so broken
  wiring never ships

To hand-test an exercise, open it in the dev server, write the intended
solution, run it, and press **Check solution**. Also try the wrong-but-close
solutions you expect from learners to make sure they *fail*.

## Renaming and updating content

Learner progress is stored in the browser, keyed by slug, next to a cached
copy of the content. On each visit the app compares a content hash and
refreshes stale cached content **without touching progress** — so:

- **Editing a file** (title, instructions, even `initial_sql` or
  `desired_state`) is safe. Redeploy and every visitor picks up the new
  content while keeping their completion state.
- **Renaming a file** changes the slug, which makes it a *different* entity:
  visitors lose their progress for it (the old row is orphaned, the new slug
  starts fresh). Avoid renaming published content; fix wording via `title`
  instead, which is display-only.

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
