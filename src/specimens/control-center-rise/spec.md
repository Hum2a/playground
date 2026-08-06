# Control Center Rise (portable recreation spec)

A compact control strip rises from the bottom while the active game surface stays visible behind it. Original PlayStation home-language study — no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| Game label | `TITLE A` |
| Strip status | `READY` |

## Colours

| Token | Hex |
| ----- | --- |
| Primary | `#2E90FF` |
| Ink | `#0B0F14` |
| Paper | `#F4F6F8` |
| Soft | `#7EB6FF` |

## API

```js
openControlCenter()
dismissControlCenter()
toggleControlCenter()
```

## Reduced motion

Strip appears at its final raised position instantly with no slide transition.
