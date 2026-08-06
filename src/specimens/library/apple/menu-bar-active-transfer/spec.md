# Menu Bar Active Transfer (portable recreation spec)

Open top-level menu transfers between `FILE`, `EDIT`, and `VIEW` headings without dismissing the surface.

## Contract

| Parameter | Value |
| --------- | ----- |
| Bar height | `32px` |
| Menu width | `190px` |
| Horizontal transfer | `120ms` |
| Height adjust | `100ms` |
| Row counts | FILE 5, EDIT 6, VIEW 4 |
| Grace period | `220ms` |

## Reduced motion

Instant transfer between anchors.

## API

- `resetMenuBarActiveTransfer()`
