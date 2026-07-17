---
title: "When spreadsheets stop scaling"
---

To be fair to spreadsheets: they're wonderful. For a budget, a schedule, or a
fifty-row list, a spreadsheet is probably the *right* tool. The trouble
starts when the data grows — in size, in number of people touching it, and in
how much you depend on it being correct. Then the cracks appear, and they're
always the same ones.

## The same file, everywhere

A spreadsheet is a file, and files get copied. One gets emailed to a
colleague, one lives in a shared drive, one is renamed
`inventory_final_v3 (2).xlsx`. Each copy starts drifting the moment it's
made. Soon the most important question about your data isn't *what does it
say* but *which file is the real one* — and there's no good answer.

## Growth hurts

Every time you open a spreadsheet, your computer loads **the whole thing** —
every row, every sheet — just so you can look at the handful of rows you
care about. At ten thousand rows that's a pause; at a few hundred thousand
it's a spinning cursor; at millions it simply won't open. And your data
doesn't stop growing to be polite.

## Nothing enforces the rules

Spreadsheets accept anything into any cell. A date typed as "next Tuesday",
a phone number in the email column, the same customer entered three times
with three spellings, a formula silently overwritten by a pasted value. With
two users and twenty rows you'd spot it. With ten users and a hundred
thousand rows, errors don't get noticed — they get *totalled into reports*.

## Everything is duplicated

We saw this in the last chapter: with no way for one sheet to reliably point
at another, the same facts get copied wherever they're needed — the
customer's address on every order row. Copies drift, and drifted data means
two reports that disagree, with no way to tell which is right.

## One editor at a time

Classic spreadsheet files lock while open — the "someone else is editing"
message. Cloud spreadsheets let people type simultaneously, but "we can both
type" is not the same as "the numbers stay consistent while we both change
them" — there's no notion of *this set of changes must happen together or
not at all*.

---

Databases were built, piece by piece, as the answer to exactly this list:
one authoritative copy, asking instead of opening, enforced rules, facts
stored once, and safe simultaneous use. The next three lessons take those
one at a time.
