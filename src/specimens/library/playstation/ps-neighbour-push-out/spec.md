# Neighbour Push-Out

Focused card widens and scales; adjacent cards yield by frozen push
distances, then restore when focus moves.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `420 × 300px`, `overflow: hidden` |
| Cards | `3` |
| Idle / focus width | `92px` / `112px` |
| Height | `128px` |
| Focus scale | `1.06` |
| Push near / mid / far | `20px` / `24px` / `36px` |
| Travel | `300ms` |
| Easing | `cubic-bezier(0.22, 0.61, 0.36, 1)` |

## Interaction

- Click a card → expand + neighbours translate aside.
- Changing focus restores previous neighbours and yields new ones.

## Acceptance

- Focused card expands to 112px at scale 1.06.
- Neighbours yield by frozen 20 / 24 / 36px push distances, then restore.
- Reduced motion applies expand and offsets instantly.

## Reduced motion

Both triggers disable `.pnpo__card` transitions so expand/push snap.

## API

- `focusNeighbourCard(index)` — `0…2`
