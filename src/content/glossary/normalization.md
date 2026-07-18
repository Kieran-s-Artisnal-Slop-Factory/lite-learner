---
term: Normalization
short: Structuring tables so each fact is stored exactly once, avoiding duplicated, drift-prone data.
---

Normalization means giving each kind of thing its own [[table]] and linking them
by id, so a member's phone number lives in exactly one [[row]] instead of being
copied onto every book they borrow. Change it once and every
[[relationship|related]] record is up to date.

It's the cure for the duplicated, self-contradicting data that spreadsheets
accumulate, where the same fact copied in many places quietly drifts out of sync.
