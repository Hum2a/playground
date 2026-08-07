# Control Center Rise (portable recreation spec)

A compact control strip rises from the bottom while a layered game plane stays visible behind it (blurred when open). Original PlayStation home-language study — no franchise assets.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3307` / `PS-001` |
| Rise duration | `420ms` |
| Rise easing | `cubic-bezier(0.2, 1, 0.3, 1)` |
| Game blur (open) | `5px` on `.ccr__game` |
| Strip slots | Friends · Media · Party · Store · Settings |
| Game label | `TITLE A` |

## API

```js
openControlCenter()
dismissControlCenter()
toggleControlCenter()
```

## Behaviour

1. Closed: strip translated fully below the playfield; game plane sharp.
2. Open: strip covers the bottom of the playfield; game stays visible under a soft blur; top-edge bloom on the strip.
3. Dismiss restores the full sharp game view.

## Reduced motion

Strip and blur snap to their final open/closed states instantly — no slide or filter transition.
