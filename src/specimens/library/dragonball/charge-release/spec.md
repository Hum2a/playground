# Charge Release

**Ref:** SPX-969 · **Catalogue:** DB-004 (Charge → Release)

## Intent

Prepared charge becomes a committed travelling deploy. Before RELEASE: **REVERSIBLE**.
After RELEASE begins: **COMMITTED**. Impact leaves a persistent residue glow and
deploy mark on PRODUCTION — not a clean reset.

## Copy

| Role | Value |
| --- | --- |
| Source | `LOCAL` |
| Target | `PRODUCTION` |
| Operation | `DEPLOY` |
| Charge ladder | `0 20 40 60 70 85 100` |
| Gate | `70%` |
| Canonical release | `85%` |
| Before | `REVERSIBLE` |
| After | `COMMITTED` |
| Complete | target `DEPLOYED`, charge `0%` |

## Node sizes (frozen)

| Charge | Size |
| --- | --- |
| 0% | 24px |
| 20% | 34px |
| 40% | 44px |
| 60% | 54px |
| 70% | 60px |
| 85% | 68px |
| 100% | 76px |

## Release timing

| Phase | Duration |
| --- | --- |
| Horizontal compress `scaleX(1→.72)` | 70ms |
| Lane trail grows + travel + 3 afterimages | ~340ms |
| Target shake + one impact ring | 120ms |
| Residue + deploy mark settle | 200ms (static after) |

## Commit residue

After impact, PRODUCTION retains:

| Element | Geometry | Colour |
| --- | --- | --- |
| Residue glow | 52px radial at 58% vertical | `#6ecf8e` at 42% → transparent |
| Deploy mark | 16px ring + fill at impact point | `#6ecf8e` border |

Both persist in final static state alongside `DEPLOYED` / `COMMITTED`.

## API

- `runChargeSequence(stopAt?)`
- `runChargeRelease()` — charge to 85% then release
- `resetChargeRelease()`

## Reduced motion

On RELEASE: immediately `DEPLOYED`, charge `0%`, `COMMITTED`, residue + mark visible.

## Accessibility

RELEASE disabled below 70%. Live announce on commit. `:focus-visible` on controls.
