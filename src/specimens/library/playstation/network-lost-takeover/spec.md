# Network Lost Takeover

Active play surface dims and scales back under a full-stage offline panel. Distinct from Game Crash Recovery (fold dialog with actions) — here the network panel owns the viewport.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3441` / `PS-135` |
| Content scale | `0.78` |
| Content blur | `5px` + brightness `0.55` |
| Content opacity | `0.18` |
| Veil | ink at `0.55` opacity |
| Dim duration | `400ms` |
| Panel fade | `360ms` |
| Trigger | LOSE CONNECTION / RETRY / RESTORE |

## Acceptance

1. Online: play HUD readable; offline panel hidden.
2. Offline: play surface visibly smaller, blurred, and dimmed under the panel; RETRY restores online.
3. Status announces phase; colour is not the only signal.

## Reduced motion

Dim and panel opacity snap to end states; transitions removed under both RM hooks.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
