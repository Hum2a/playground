# Horizon-Style Focus Scan

A bracket reticle locks onto a warm-terrain artifact while a metadata panel reveals scan results. Focus-scan silhouette — not a generic dark HUD chip stack.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3487` / `PS-181` |
| Scan | `1100ms` sweep + corner lock |
| Reveal | `400ms` metadata panel |
| Target | warm artifact on terrain field |
| Trigger | SCAN TARGET |

## Acceptance

1. SCAN runs a vertical sweep with locking corner brackets.
2. After `1100ms` a right-side metadata panel lists TYPE / RARITY / VALUE.
3. Stage reads as outdoor focus scan, not a flat dark console HUD.

## Reduced motion

Metadata reveals instantly; sweep/lock keyframes removed under both RM hooks.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
