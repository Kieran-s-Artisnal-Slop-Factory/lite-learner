---
term: Horizontal scaling
short: Handling more load by spreading data across many machines. "Scaling out."
---

Horizontal scaling — "scaling out" — spreads data across many cheaper machines and
keeps working as some inevitably fail. It can grow almost without limit, but
distributing data makes [[join|joins]] and strict [[transaction|transactions]]
harder.

That trade-off is exactly what the early [[nosql]] systems accepted to reach
web-scale. Contrast [[vertical-scaling]].
