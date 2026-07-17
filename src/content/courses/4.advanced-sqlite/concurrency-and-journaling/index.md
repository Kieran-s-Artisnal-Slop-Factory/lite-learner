---
title: WAL Mode and Concurrency
lessons:
  - journal-modes
  - busy-timeout
  - cache-size
---

How SQLite stays durable and lets readers and writers coexist: journal modes,
the write-ahead log (WAL), and checkpointing. This in-browser database runs in
`memory` mode, so we'll read the mode and explore the concurrency knobs that
still apply.
