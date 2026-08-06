# Paper stack shuffle (portable recreation spec)

Physical paper-stack selection: the front sheet lifts, pulls sideways clear of the
stack, remaining sheets advance, and the extracted sheet travels behind to the deepest
slot. Not a carousel. Rebuild from this document, `demo.css`, `demo.js`, and
`contract.json`. No copyrighted assets.

## Visual intent

- Four irregular clipped paper sheets with hard black backings (~5px offset)
- Frozen depth poses (rotation + translate) — visual order genuinely changes
- Palette: paper `#f2eee3`, bright `#fffdf7`, ink `#090909`, red `#d71920`
- Only the foreground sheet reads as the active/current content

## DOM

```html
<div class="paper-stack-demo">
  <div class="paper-stack" aria-hidden="true">
    <article class="paper-stack__sheet" data-sheet="0" data-depth="0">…</article>
    <!-- sheets 1–3 -->
  </div>
  <button type="button" data-paper-prev>PREVIOUS</button>
  <button type="button" data-paper-next>NEXT</button>
  <p role="status" aria-live="polite">Selected: 01 Motion</p>
</div>
```

DOM sheet ids stay stable. Visual order is a JS array (front → back). The stack is
`aria-hidden`; selection is announced only via the status node.

## Depth contract (front → back)

| Depth | translate | rotate | z-index |
| --- | --- | --- | --- |
| 0 | `0, 0` | `-2deg` | 40 |
| 1 | `8px, 8px` | `3deg` | 30 |
| 2 | `-5px, 16px` | `-4deg` | 20 |
| 3 | `11px, 23px` | `2deg` | 10 |

Stack size: width `min(78%, 360px)`, height `~220px`.

## Clip-paths (frozen)

| Sheet | clip-path |
| --- | --- |
| A / 01 | `polygon(0% 2%, 97% 0%, 100% 96%, 3% 100%)` |
| B / 02 | `polygon(1% 0%, 100% 3%, 97% 100%, 0% 95%)` |
| C / 03 | `polygon(0% 4%, 96% 0%, 100% 93%, 4% 100%)` |
| D / 04 | `polygon(2% 0%, 100% 5%, 98% 100%, 0% 94%)` |

## NEXT (~720ms)

1. **0–120** Lift front: `translateY(-8px) scale(1.02) rotate(~-4deg)`; z elevated
2. **120–360** Extract: `translateX(var(--extract-x)) translateY(-14%) rotate(9deg)` — must clear stack
3. **~260–500** Depths 1→0, 2→1, 3→2 with visible motion (not z-only)
4. **360–650** While clear, drop z behind stack, path right → down → deepest pose
5. **650–720** Tiny settle; commit order (`front` → back of array)

**Critical:** change z-index / order only while the sheet is visually clear of others.

## PREVIOUS

Complementary path: deepest sheet exits sideways while still behind, then elevates once
clear, flies to the front corridor, and settles at depth 0 while others retreat one depth.
Do not reverse NEXT keyframes if that causes teleport-through-layer artifacts.

## API

```js
export function shufflePaperStack(direction) // 'next' | 'prev'
```

- Busy lock: ignore control clicks while animating
- `DEPTH_POSES` / `SHEET_LABELS` exported for recreation
- No network, storage, or `parent` access

## Reduced motion

Immediate order change + settled depth poses. No flight path. Stack composition remains.

## Responsive

At narrow widths `--extract-x` reduces (e.g. `58%`) so extraction stays clipped but still
reads as a side pull. Same markup.

## Acceptance notes

Cycling repeatedly must not drift — always re-apply frozen `DEPTH_POSES` after settle.
