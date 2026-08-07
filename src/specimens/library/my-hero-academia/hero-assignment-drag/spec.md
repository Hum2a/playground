# Hero Assignment Drag (portable recreation spec)

Profile card **HERO // 07** condenses into a compact dispatch proxy and travels to the
**DISPATCH** zone (~740ms).

## Copy

| Role | Text |
| ---- | ---- |
| Card kicker | `HERO // 07` |
| Card title | `UNIT READY` |
| Card meta | `RANK 04 · OUTPUT` |
| Zone label | `DISPATCH` |
| Live idle | `Assign HERO // 07 to dispatch zone.` |
| Live dragging | `Condensing profile into dispatch proxy…` |
| Live assigned | `HERO // 07 assigned to dispatch.` |
| Live cancelled | `Assignment cancelled. HERO // 07 returned to roster.` |

## Colours

| Token | Hex |
| ----- | --- |
| Primary | `#38A3FF` |
| Ink | `#101820` |
| Paper | `#F4F7FA` |
| Accent | `#FF4D35` |

## Timing

| Phase | Duration |
| ----- | -------- |
| Proxy travel | 740ms |

## Geometry

| Token | Value |
| ----- | ----- |
| Board | 360×190px, 12px gap |
| Proxy start | 12% / 28%, 110×52px, scale 1 |
| Proxy end | 58% / 32%, 92×44px, scale 0.92 |

## API

```js
runHeroAssignmentDrag()
resetHeroAssignmentDrag()
cancelHeroAssignmentDrag()
```

## Keyboard

| Key | Action |
| --- | ------ |
| Enter / Space (card or Assign) | Start assignment |
| Escape (during drag) | Cancel and restore roster |

## Reduced motion

Placeholder card + filled zone immediately; no proxy travel.

## Acceptance

1. Assign: proxy animates start→end geometry; zone fills on completion.
2. Source card dashed placeholder during drag.
3. Frozen CSS geometry vars for proxy and board.
4. Keyboard assign + Escape cancel; aria-live announces all states.
5. Reset restores idle; reduced motion skips animation.
