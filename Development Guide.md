# Development Guide

System architecture, project layout, and the key technologies and approaches
behind Lite Learner. For authoring content, see the
[Course Development Guide](Course%20Development%20Guide.md).

## The core idea

Lite Learner is a **fully static** site with **no backend**. Two kinds of data
are kept deliberately apart:

- **Content** (titles, prose, `initial_sql`, `desired_state` solutions) is
  authored as markdown, validated by Astro content collections at build time,
  and baked into the static bundle.
- **Progress** (started/completed timestamps, current position, editor
  buffers) is per-visitor and lives only in the browser's IndexedDB.

Content is *copied* into IndexedDB on enrollment so the app runs offline, and
kept fresh with a content hash. Everything the learner does — running SQL,
checking solutions, tracking progress — happens client-side.

## Tech stack

| Concern             | Choice                                                                                |
| ------------------- | ------------------------------------------------------------------------------------- |
| Static generation   | **Astro 7** — one page per course/chapter/lesson, content collections for validation  |
| Interactivity       | **Svelte 5 (runes)** islands, mounted with `client:only="svelte"`                      |
| SQL engine          | **[sqlite-wasm](https://github.com/sqlite/sqlite-wasm)** in a Web Worker, in-memory    |
| Editor              | **CodeMirror 6** with `@codemirror/lang-sql`                                           |
| Local storage       | **IndexedDB** via [`idb`](https://github.com/jakearchibald/idb)                        |
| Offline             | a hand-written **service worker** + web app manifest (installable PWA)                 |
| Tests               | **vitest** (the solution comparator and the content resolver)                          |

Versions are pinned to ranges proven together (Astro 7 / Svelte 5 / idb 8);
major upgrades may change generated-code assumptions.

## Project layout

```
src/
  content/
    courses/                    authored courses (folders; see Course Development Guide)
  content.config.ts             the three content collections + their Zod schemas
  layouts/Layout.astro          <html> shell: theme/palette boot, SW registration, manifest
  pages/
    index.astro                 homepage (intro + progress dashboard island)
    courses/
      index.astro               course listing
      [course]/index.astro      course page (chapters + enroll/continue)
      [course]/[chapter]/index.astro         chapter page
      [course]/[chapter]/[lesson].astro      lesson page (instructions + island)
    playground.astro            free-form SQL scratchpad
    settings.astro              backup/restore, theme, palette
    onboarding.astro            first-run welcome
    precache.json.ts            build-time list of routes for the service worker
  components/
    Navbar.svelte  Card.svelte  Accordion.svelte
    apps/          HomeApp, CoursesApp, OnboardingApp, SettingsApp
    course/        CourseOverviewApp, ChapterApp
    exercise/      LessonApp, SqlEditor, DbViewer
    playground/    PlaygroundApp
  lib/
    content/       bundle.ts (build-time emit), sync.ts (client cache), resolve.ts (pure), types.ts
    sql/           worker.ts, client.ts, protocol.ts, comparator.ts (+ comparator.test.ts)
    db/            types.ts (+ STORES), db.ts (migrations), repo.ts, export.ts, persistence.ts
    progress.ts    completion stamping + cascade
    playground.ts  playground persistence (its own store)
    paths.ts       href()/isPath() base-path helpers
    palette.ts  editorTheme.ts   theme/palette/editor-scheme preferences
  styles/          theme.css (design tokens), global.css (base + component classes)
public/
  sw.js            service worker
  manifest.webmanifest  icons/  favicon.svg
scripts/
  generate-icons.mjs    regenerates the PWA icons from the brand colors
```

Pages are thin: an `.astro` page resolves content at build time, renders the
static prose, and mounts one Svelte island for the interactive parts.

## Data model

### Content collections (authored, static)

`src/content.config.ts` defines **three** collections over one shared base
(`src/content/courses`), separated by glob depth:

- `courses` — `*/index.md`
- `chapters` — `*/*/index.md`
- `lessons` — `*/*/*.md` (excluding `index.md`)

A `generateId` hook derives a **path-scoped id** from each file
(`sqlite-basics/what-is-a-database/count-rows`), collapsing `.../index` to its
directory. That id is the IndexedDB key *and* the URL path — so ids are stable
across builds and only need to be unique within a folder.

Ordering is authored as relative leaf names in the parent's frontmatter
(`chapters: [...]`, `lessons: [...]`). Rather than Astro's `reference()`, the
bundler resolves those leaves to full ids itself and throws on anything missing
**or orphaned**, which is the build-time validation gate. This resolution lives
in `resolve.ts` as a pure function so it can be unit-tested without
`astro:content`.

A lesson's **kind** is derived, never authored: a `desired_state` present ⇒
`exercise`; otherwise `reading`.

### IndexedDB (progress + cached content)

`src/lib/db/types.ts` defines the stores in `STORES` (`courses`, `chapters`,
`lessons`) plus a separate `playground` store. Each content-backed row is keyed
by its content slug and carries both:

- **cached content** — `content_hash`, `title`, `description`, and the child
  arrays / `initial_sql` / `desired_state`
- **progress** — `started`, `completed`, `user_solution`, `current_chapter`

Every row also has bookkeeping fields (`id`, `updated_at`, `deleted_at`,
`server_seq`). There is no sync backend, but keeping them makes soft deletes
work and leaves the door open to adding sync later without a data migration.
`repo.ts` is the CRUD layer: reads filter tombstones, writes stamp
`updated_at`, deletes are soft.

Migrations in `db.ts` are an **append-only** list — never edit a shipped one,
add the next. (The store rename from `exercises` → `lessons`, for instance, is
migration v4.)

## The content pipeline (build → offline cache)

1. **Build time** (`lib/content/bundle.ts`, Node-only): each course is resolved
   into a tree and turned into JSON payloads, each stamped with a stable
   `content_hash` — a SHA-256 of the canonicalized frontmatter + body. Pages
   embed the payloads they need.
2. **Enrollment**: `syncCourseBundle` copies a whole course (course + chapters +
   lessons) into IndexedDB.
3. **On every load** (`lib/content/sync.ts`): the embedded hash is compared to
   the cached row's hash:
   - no row → create it
   - hash differs → overwrite the **content** fields and hash, **preserving
     progress**
   - hash matches → use the cache as-is

This is why editing a lesson is safe (progress survives) but renaming its file
is not (the id, and therefore the key, changes).

## The editor interface

`components/exercise/SqlEditor.svelte` wraps **CodeMirror 6** with the SQL
language mode. A few deliberate choices:

- **Themed from CSS tokens.** Rather than a bundled CodeMirror theme, the editor
  chrome and syntax highlighting reference the `--editor-*` and `--syntax-*`
  custom properties from `theme.css`. Swapping the app palette (or light/dark)
  re-colors the editor for free, including the autocomplete popup.
- **Independent color scheme.** The editor can be pinned light or dark
  separately from the app (see `editorTheme.ts`) by overriding `color-scheme`
  on the editor host; the `light-dark()` tokens resolve per-subtree, so the
  whole editor and its popup flip without a second palette.
- **`Ctrl/Cmd-Enter` runs** the buffer via a keymap.

`DbViewer.svelte` renders the current database: a tab per table, each column's
declared type, and the first 50 rows.

## Solution validation

The engine is the source of truth, not an editor-side linter. Two paths:

- **Syntax/validity errors** come from `prepare()`-ing every statement in the
  buffer against SQLite WASM and surfacing the thrown error verbatim.
- **Solution checks** run `desired_state.query` against the learner's live
  database and compare the returned rows to `desired_state.rows`.

The comparator (`lib/sql/comparator.ts`) is a **pure function**,
`(expectedRows, actualRows) => boolean`, kept free of engine/DOM imports so it
is thoroughly unit-tested (`comparator.test.ts`) — that's where the subtle bugs
live. Its rules:

- **Positional** — row `i` vs row `i`, exact row count (authors must
  `ORDER BY`).
- **Column subset** — only the keys present in the expected object are checked;
  extra result columns are ignored.
- **Expected-value-driven coercion** — `null` matches SQL NULL; numbers
  normalize `BigInt`/REAL (integers exact, reals within `1e-9`); booleans
  compare to `1`/`0`; strings are strict TEXT equality. BLOBs are out of scope.

See the Course Development Guide for the authoring-side rules and introspection
tricks that make hard-to-observe tasks (schema, indexes, triggers) checkable.

## The SQL engine (Web Worker)

`lib/sql/worker.ts` owns a **single in-memory** SQLite database
(`:memory:`), so a slow or looping query never freezes the UI thread; the tab
just terminates and restarts the worker if needed.

**In-memory only, no OPFS — on purpose.** OPFS-backed persistence needs
`SharedArrayBuffer`, which requires cross-origin isolation
(`Cross-Origin-Opener-Policy` + `Cross-Origin-Embedder-Policy`) headers that
many static hosts won't let you set. A fresh in-memory DB sidesteps that
entirely and keeps deployment host-agnostic. (`sqlite-wasm` is also excluded
from Vite's dep pre-bundling in `astro.config.mjs`, which otherwise breaks its
worker/asset URL resolution.)

`client.ts` is a small promise-based wrapper: each call posts a `{ id, type,
...payload }` message and resolves when the worker replies `{ id, ok, result }`
(protocol in `protocol.ts`). Supported ops: `reset`, `exec`, `prepare`
(validate), list tables, and read a table's rows.

### The lesson-load sequence

When a lesson with a database opens (`LessonApp.svelte`):

1. Instantiate a fresh in-memory DB.
2. Run `initial_sql` to seed it.
3. Restore the editor buffer from `user_solution` **but do not execute it** — a
   single stored buffer can't reproduce accumulated DB state, and auto-running a
   half-finished buffer could throw. A banner tells the learner to re-run.
4. Open the DB viewer on the first table.
5. Stamp `started` if it was null.
6. Surface completed state if already done.

**Reset** discards the DB, clears `user_solution`, and re-runs the sequence.

## Progress model

Completion is always a **nullable `completed` timestamp** — "is complete"
derives from `completed != null`; no boolean is stored. `lib/progress.ts`
stamps it and cascades: a lesson completes (a passing check for exercises,
"Mark as read" for readings), which completes its chapter once every lesson in
it is done, which completes the course once every chapter is done. Opening a
lesson stamps `started` up the tree and points `course.current_chapter` at it,
which is what the homepage dashboard and "Continue" buttons key off.

## Offline support & PWA

`public/sw.js` makes the whole app work offline after the first visit:

- **Install** precaches every route from the build-time `precache.json`
  manifest (generated from the content collections, so new content is
  automatically covered), then crawls the cached HTML/JS/CSS for fingerprinted
  `/_astro/` assets so even unvisited pages work offline.
- **Navigations** are network-first (fresh page when online, cached page
  offline); **assets** are stale-while-revalidate.

The service worker derives every path from its own registration scope, so it
works unchanged under a sub-path deploy. `Layout.astro` threads the configured
`base` into the registration and the manifest/icon links. The site is an
installable PWA via `public/manifest.webmanifest`; the PNG icons in
`public/icons/` are generated by `scripts/generate-icons.mjs` (dependency-free)
— re-run it if the brand colors change.

## Base-path / sub-path hosting

Astro doesn't rewrite `href` attributes, so **every internal link and
navigation goes through `href()` in `lib/paths.ts`**, which prefixes
`import.meta.env.BASE_URL`. With `base: '/lite-learner'` in `astro.config.mjs`
the app serves correctly at `example.com/lite-learner/`; set `base` to `/` (or
remove it) to serve at the root. `isPath()` compares a pathname against a
base-aware route (used for nav active state). The first-run onboarding gate in
`Layout.astro` is likewise base-aware, so it redirects within the sub-path
rather than to the domain root.

## Theming

`styles/theme.css` is two layers:

1. A **palette** of raw `--pal-*` color slots, each a `light-dark()` pair. Three
   palettes ship (gruvbox default, "boring", "forrest"); the active one is
   chosen by `data-palette` on `<html>`.
2. **Semantic tokens** (surfaces, text, accents, syntax, editor) that reference
   only `--pal-*`. Adding a palette means filling in one more block of slots —
   nothing else changes.

Palette and light/dark pins are stored in localStorage and applied by
`Layout.astro` before first paint to avoid a flash. Rendered markdown code
blocks use Shiki with dual gruvbox themes (`defaultColor: false` emits
`--shiki-light`/`--shiki-dark` variables that CSS selects between).

## Persistence, backups & migrations

- **Backups** (`lib/db/export.ts`): Settings → Backup exports every store
  (tombstones included) as one JSON envelope; import clears and reloads the
  covered stores. It's the only copy — everything lives in the browser.
- **Persistent storage** (`persistence.ts`): the app requests the persistent
  IndexedDB bucket so browsers are less likely to evict progress.
- **Schema changes** touch two files together: the entity types + `STORES` in
  `db/types.ts`, and a new appended migration in `db.ts`. Never edit a shipped
  migration.

## Testing

```sh
npm test         # vitest: comparator (coercion rules) + resolve (id/ordering/orphans)
npm run build    # the content-validation gate — schema + wiring errors fail here
```

The comparator and resolver are deliberately pure so they test without a
browser or `astro:content`. Everything else is validated by the build and by
manual dev-server passes.

## Notable one-offs

- `/playground` — a free-form SQL scratchpad backed by its own IndexedDB store
  (`playground.ts`): it autosaves the editor buffer and can persist a SQL dump
  of the database that's re-run on load, since the in-memory DB otherwise
  vanishes.
- `/spike` — a throwaway page for poking at the SQLite worker without a lesson
  around it. Safe to delete.
