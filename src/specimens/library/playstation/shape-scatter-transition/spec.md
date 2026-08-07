# Shape Scatter Transition

Four original primitives burst from a source control through a midfield scatter ring, then reform around a destination panel. Distinct from Four-Shape Orbit Loader (continuous orbit → diamond settle) and Controller Disconnected Alert (system modal).

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3319` / `PS-013` |
| Primitives | circle · cross · square · triangle |
| Burst | `280ms` midfield ring |
| Travel | `720ms` source → mid → dest |
| Reform | `360ms` destination solidify |
| Trigger | RUN SCATTER |

## Acceptance

1. RUN SCATTER reveals tokens leaving SOURCE into a midfield dashed ring.
2. Tokens settle into DESTINATION corners; dest border solidifies.
3. Silhouette is a travel field — not an alert modal or orbit rail.

## Reduced motion

Tokens snap to destination; travel and burst transitions removed under both RM hooks.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
