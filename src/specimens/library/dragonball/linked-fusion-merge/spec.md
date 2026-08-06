# Linked Fusion Merge

**Ref:** SPX-1022 · **Catalogue:** DB-057 (Potara Fusion)

## Intent

External shared link forces merge. Unlike Synchronous Fusion Merge (`SPX-1021`), entities do not self-align first — the relationship pulls them together.

## Scaffold

| Role | Copy |
| --- | --- |
| A | `PROFILE // A` · `12 ATTRIBUTES` |
| B | `PROFILE // B` · `8 ATTRIBUTES` |
| Relation | `UNLINKED` → `LINK ACTIVE` → `LINKED MERGE` |
| C | `PROFILE // C` · `20 ATTRIBUTES` · `LINKED MERGE` |
| Provenance | `A + B` |

## Geometry (frozen)

| Token | Value |
| --- | --- |
| Gap (centres) | 220px |
| A / B | 100 × 120px |
| Nodes | 10 × 10px |
| Diamond | 14 × 14px → 34px at hold |
| C | 126 × 138px |

A: rectangular + horizontal bars. B: clipped parallelogram + diagonals. C: both + permanent diamond core.

## Timing (from LINK)

| Phase | ms |
| --- | --- |
| Node fill | 90 |
| Lines to midpoint | 180 |
| Diamond form | 80 |
| Tension | 120 |
| Converge | 280 |
| Diamond hold | 70 |
| Collapse | 100 |
| C expand | 220 |

## API

- `runLinkedFusion()`
- `resetLinkedFusion()`
