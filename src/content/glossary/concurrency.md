---
term: Concurrency
short: Many users or programs reading and changing the same data at the same time, safely.
---

Concurrency is the challenge of many people or programs touching the same data at
once. Without protection, two buyers can both purchase the last ticket because
both saw it available.

Databases handle it with [[transaction|transactions]] and locking, so
simultaneous changes stay consistent — a guarantee a shared spreadsheet cannot
make.
