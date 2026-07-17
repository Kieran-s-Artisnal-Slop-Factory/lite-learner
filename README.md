# Lite Learner

Lite Learner is a statically generated, interactive learning management system
that teaches SQLite entirely in the browser, powered by
[sqlite-wasm](https://github.com/sqlite/sqlite-wasm). Courses are authored as
markdown and baked into a static site at build time; every exercise runs
against a **real, in-memory SQLite database** in a Web Worker. There is no
server and no account — a visitor's progress lives only in their browser, and
the whole app works offline after the first visit.

Four courses ship with it — a database-agnostic Introduction to Databases
(reading-only, for non-technical learners), then Beginner, Intermediate, and
Advanced SQLite — covering everything from "what is a database" to triggers,
CTEs, WAL mode, and query planning. A live version is available at
[https://kieranwood.ca/lite-learner](https://kieranwood.ca/lite-learner)

## How it works, in one breath

Two kinds of data are kept deliberately separate:

- **Content** — titles, prose, `initial_sql`, and `desired_state` solutions —
  is authored as markdown, validated by Astro content collections (broken
  wiring fails the build), and baked into the static bundle.
- **Progress** — started/completed, current position, editor buffers — is
  per-visitor and lives only in IndexedDB.

When you enroll, a course's content is *copied* into IndexedDB next to your
progress so the app works offline. Each page embeds a content hash; on load the
client refreshes any stale cached content while always preserving progress. An
exercise is checked by running its solution query against your live database
and comparing the rows — so it grades **what your database looks like**, not
the exact SQL you typed.

## Quickstart

Requires Node >= 22.12.

```sh
npm install
npm run dev      # dev server (Astro prints the URL)
npm test         # unit tests (vitest) — the solution comparator + resolver
npm run build    # static output in dist/  (also the content validation gate)
npm run preview  # serve the built dist/ locally
```

## Deploy

`npm run build`, then host `dist/` on any static host — GitHub Pages, Netlify,
Cloudflare Pages, or a plain file server. No runtime and no special headers are
required (the SQLite engine is in-memory on purpose, sidestepping the
COOP/COEP requirement of OPFS persistence).

For sub-path deploys (e.g. GitHub Pages under `/lite-learner/`), set `base` in
`astro.config.mjs`. It's currently set to `/lite-learner`; every internal link
goes through a `href()` helper and the service worker derives its paths from
its own scope, so offline precaching keeps working under any base.

## Documentation

- **[Course Development Guide](Course%20Development%20Guide.md)** — how to
  author courses, chapters, and lessons; writing and debugging `desired_state`
  solution checks, including introspection tricks for tougher cases.
- **[Development Guide](Development%20Guide.md)** — system architecture, project
  layout, and how the editor, offline support, and solution validation are
  built.

## Backups

The only copy of a visitor's progress is the browser it was created in.
Settings → Backup exports/imports everything as one JSON file.
