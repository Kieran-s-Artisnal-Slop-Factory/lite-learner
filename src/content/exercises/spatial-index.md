---
title: "Spatial queries with R*Tree"
initial_sql: |
  CREATE VIRTUAL TABLE boxes USING rtree(id, minX, maxX, minY, maxY);
  INSERT INTO boxes (id, minX, maxX, minY, maxY) VALUES
    (1, 0.0, 1.0, 0.0, 1.0),
    (2, 5.0, 6.0, 5.0, 6.0),
    (3, 0.4, 0.6, 0.4, 0.6);
desired_state:
  query: "SELECT id FROM answer ORDER BY id;"
  rows:
    - { id: 1 }
    - { id: 3 }
---

The **R*Tree** module is a built-in extension for indexing ranges and geometry —
bounding boxes, map regions, time intervals — so "what overlaps this area?"
queries stay fast. Each row stores an id plus min/max pairs per dimension:

```sql
CREATE VIRTUAL TABLE boxes USING rtree(id, minX, maxX, minY, maxY);
```

To find every box that contains a given point, ask which boxes' ranges straddle
it on both axes. For the point `(0.5, 0.5)`:

```sql
SELECT id FROM boxes
WHERE minX <= 0.5 AND maxX >= 0.5
  AND minY <= 0.5 AND maxY >= 0.5;
```

The R*Tree index answers this without scanning every row — the whole point when
you have millions of shapes.

## Your task

The `boxes` table holds three rectangles. Find the ones that contain the point
`(0.5, 0.5)` and save their `id`s into `answer`:

```sql
CREATE TABLE answer AS
SELECT id FROM boxes
WHERE minX <= 0.5 AND maxX >= 0.5
  AND minY <= 0.5 AND maxY >= 0.5;
```

Check your solution — box 1 (the unit square) and box 3 (the small central box)
contain the point; box 2 is far away.
