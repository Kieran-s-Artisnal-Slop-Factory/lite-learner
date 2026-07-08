---
title: Idempotent Database Changes
exercises:
  - rerunnable-schema
  - drop-if-exists
  - convert-unsafe-script
---

Setup scripts get run more than once — on every deploy, every app boot. Learn to
write schema changes that are safe to re-run, using `IF NOT EXISTS` and
`DROP ... IF EXISTS`, so running them again never errors or clobbers data.
