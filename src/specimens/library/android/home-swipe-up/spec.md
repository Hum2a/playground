# Home Swipe Up (portable recreation spec)

Full app surface above a launcher background. Upward drag from the bottom
28px navigation zone shrinks the app toward a home icon position.

## Visual intent

390×700 frame. Drag 0→240px maps to translateY 0→-70px, scale 1→0.72,
radius 0→30px, launcher opacity 0.25→1. Commit at 150px travel or upward
velocity >0.6 px/ms.

## Contract

| Parameter | Value |
| --------- | ----- |
| Frame | 390×700px |
| Nav zone | 28px bottom |
| Max drag | 240px |
| Commit distance | 150px |
| Commit velocity | 0.6 px/ms |

## Reduced motion

Direct drag tracking preserved; release resolves immediately without
animated settle.

## API

- `mapGesture(y)`
- `resetHomeSwipeUp()`

## Accessibility

Status region announces gesture phase. Decorative launcher is aria-hidden.

## Porting

Import `demo.css` verbatim.
