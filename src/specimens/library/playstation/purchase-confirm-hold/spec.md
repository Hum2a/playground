# Purchase Confirm Hold

A store product card with price and legal copy — hold the CTA bar to confirm purchase (not a DualSense trigger twin).

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3389` / `PS-083` |
| Hold duration | `850ms` |
| Price | `$19.99` |
| Title | `Title Pack` |
| Legal | Non-refundable digital licence · Instant delivery · Study demo |

## Behaviour

1. Idle: store card shows title, price, legal, empty CTA fill.
2. Holding: CTA fill advances over `850ms`.
3. Confirm: label becomes `Purchased · $19.99`.
4. Early release cancels; reduced motion keeps threshold without fill transition.

## Palette

- Blue: #2E90FF · Ink: #0B0F14 · Chalk: #F4F6F8 · Sky: #7EB6FF
