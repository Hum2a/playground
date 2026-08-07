# State Field Transfer (portable recreation spec)

**Ref:** SPX-1115 · **Catalogue:** DB-150 (State Aura Transfer)

## Intent

A three-contour boost **field visibly leaves** Node A — wisps peel off, contours
collapse outer→inner into an 18px token — travels a **lit conduit** with trail
and pulse to Node B, then **ignites** and rebuilds the field inner→outer.
Ownership never ACTIVE on both nodes at once. This is not a label swap; the
aura visibly departs, transits, and arrives.

## Scaffold

| Role | Copy |
| --- | --- |
| Source | `NODE // A` · `BOOST // ACTIVE` |
| Destination | `NODE // B` · `BOOST // NONE` |
| Trigger | `TRANSFER BOOST` |
| Midpoint A | `BOOST // NONE` · `IDLE` |
| Midpoint B | `BOOST // PENDING` · `PENDING` |
| Final A | `BOOST // NONE` |
| Final B | `BOOST // ACTIVE` |
| Announce | `Boost transferred from Node A to Node B.` |

## Visual layers (frozen)

| Layer | Role |
| ----- | ---- |
| Contours ×3 | Rotated squares on donor/receiver |
| Wisps ×4 | Peel from donor during collapse |
| Conduit | Full-width glow bed under segments |
| Segments ×7 | Channel construction + travel highlights |
| Token + trail | Collapsed field packet with comet tail |
| Pulse | Leading glow blob along conduit |
| Ignite | Receiver flash on arrival |

## Geometry

| Token | Value |
| --- | --- |
| Node gap | 240px |
| Contours | 3 (outer / middle / inner), 88×88px field |
| Channel segments | 7 |
| Transfer token | 18 × 18px with 3 nested marks |
| Wisps | 4 |

## Timing (ms from TRANSFER BOOST)

| Phase | Value |
| --- | --- |
| Channel + conduit build | 160ms |
| Collapse stagger | 45ms (outer → inner) + wisps |
| Travel + trail + pulse | 340ms |
| Midpoint handoff | travel midpoint (+170ms) |
| Arrive compress | 50ms + ignite flash 220ms |
| Rebuild stagger | 50ms (inner → outer) |
| Channel retract | 160ms |

## API

- `runStateFieldTransfer()`
- `resetStateFieldTransfer()`

## Reduced motion

Immediate A NONE / B ACTIVE with field on B only; no wisps, conduit, token, or ignite animation.

## Accessibility

Polite live region announces transfer start, midpoint handoff, and final ownership.
