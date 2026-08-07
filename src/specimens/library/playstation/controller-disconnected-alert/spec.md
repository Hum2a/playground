# Controller Disconnected Alert

Play is interrupted by a high-priority system modal when the controller disconnects. Uses PS system blue priority chrome — not a scatter-shape kit or red error twin.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3415` / `PS-109` |
| Overlay fade | `220ms` |
| Modal border | `--ps-blue` with SYSTEM priority chip |
| Trigger | SIMULATE DISCONNECT / DISMISS |

## Acceptance

1. Disconnect shows a centred modal with SYSTEM chip over a dimmed play surface.
2. DISMISS restores play; status announces connected vs alert.
3. No geometric shape tokens appear (those belong to Shape Scatter Transition).

## Reduced motion

Overlay appears instantly without fade under both RM hooks.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
