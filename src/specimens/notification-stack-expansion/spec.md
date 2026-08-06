# Notification Stack Expansion (portable recreation spec)

Four notifications compressed into 336×150 layered stack expanding to separated 336×74 cards.

## Contract

| Parameter | Value |
| --------- | ----- |
| Cards | `336 × 74px`, gap `10px` when expanded |
| Stacked | offsets `8px`, scales `0.98` cascade |
| Duration | `320ms` |

## Reduced motion

Instant position jump between layouts.

## API

- `resetNotificationStackExpansion()`
