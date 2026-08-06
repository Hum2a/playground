# Temporal Freeze (portable recreation spec)

State-change artifact: a 2px vertical freeze boundary travels left→right across
an active interface. Subsystems ahead of the line keep moving; each stops exactly
when the line crosses its position. Resume travels right→left and restores motion
progressively. No Persona assets.

## Palette

| Mode | Tokens |
| ---- | ------ |
| Normal | `#dce5ea` / `#17212b` |
| Frozen | `#020b16` / `#0b3657` / `#49bce3` / `#d8f7ff` |

## Subsystems (centre X as fraction of stage)

| Id | X | Freeze @ 700ms sweep | Motion |
| -- | - | -------------------- | ------ |
| ticker | `0.18` | ~126ms | horizontal marker track |
| dial | `0.50` | ~350ms | rotating arm |
| pulse | `0.82` | ~574ms | vertical pulse bar |

## Boundary

- Freeze: L→R, **700ms**, `--freeze-x: 0%→100%`, line width **2px**
- Resume: R→L, **500ms**, `--freeze-x: 100%→0%`
- Frozen background veil width tracks `--freeze-x`

## Orchestration

Do **not** pause all animations at trigger. Drive progress with `requestAnimationFrame`.
When `progress >= system.x`, call `getAnimations().pause()` on that subtree and add
the angular freeze bracket. On resume, `play()` when the returning edge passes left
of the system.

## API

```js
freezeTemporal()
resumeTemporal()
resetTemporal()
```

Harness `{ type: 'restart' }` resets.

## Reduced motion

Loops disabled from the start (static poses). FREEZE snaps full frozen palette;
RESUME snaps normal palette — no boundary travel.

## Porting

1. Copy `demo.css` / `demo.js` verbatim
2. Keep overflow clipped on the host
3. Honour both reduced-motion triggers
