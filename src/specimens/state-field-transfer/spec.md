# State Field Transfer

**Ref:** SPX-1115 · **Catalogue:** DB-150 (State Aura Transfer)

## Intent

A temporary enhanced state (boost field) detaches from Node A, travels a shared channel, and reconstructs on Node B. Ownership never ACTIVE on both nodes at once.

## Scaffold

| Role | Copy |
| --- | --- |
| Source | `NODE // A` · `BOOST // ACTIVE` |
| Destination | `NODE // B` · `BOOST // NONE` |
| Trigger | `TRANSFER BOOST` |
| Final A | `BOOST // NONE` |
| Final B | `BOOST // ACTIVE` |
| Announce | `Boost transferred from Node A to Node B.` |

## Geometry (frozen)

| Token | Value |
| --- | --- |
| Node gap | 240px |
| Contours | 3 (outer / middle / inner), rotated squares |
| Channel segments | 7 |
| Transfer token | 18 × 18px with 3 nested marks |

## Timing

| Phase | Value |
| --- | --- |
| Channel build | 160ms |
| Collapse stagger | 45ms (outer → inner) |
| Travel | 340ms |
| Midpoint handoff | travel midpoint |
| Rebuild stagger | 50ms (inner → outer) |
| Channel retract | 160ms A → B |

## API

- `runStateFieldTransfer()`
- `resetStateFieldTransfer()`
