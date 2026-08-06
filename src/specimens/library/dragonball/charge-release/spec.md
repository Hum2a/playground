# Charge Release

**Ref:** SPX-969 · **Catalogue:** DB-004 (Charge → Release)

## Intent

Prepared charge becomes a committed travelling deploy. Before RELEASE: **REVERSIBLE**. After RELEASE begins: **COMMITTED**.

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
| Travel + 3 afterimages | ~340ms |
| Target shake + one impact ring | 120ms |

## API

- `runChargeSequence(stopAt?)`
- `runChargeRelease()` — charge to 85% then release
- `resetChargeRelease()`
