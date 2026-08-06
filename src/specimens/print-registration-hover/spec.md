# Print Registration Hover (portable recreation spec)

Hover/focus interaction where print plates temporarily misregister — red and cyan
separate in opposing directions while the black/master label stays readable.
Rebuild from this document and `contract.json`.

Distinct from **Misprint Notification** (SPX-016): that specimen starts misregistered
and snaps *into* registration as an overlay entrance. This specimen starts registered
and temporarily separates on hover/focus only.

Do **not** reproduce Persona 5 art, logos, fonts, or proprietary assets.
Do **not** use glitch, jitter, scanlines, flicker, or looping motion.

## Visual intent

- Three labels: PROJECTS / ARCHIVE / CONTACT
- Rest: substantially registered (tiny ≤1px permanent offsets only)
- Hover/focus: red + cyan plates separate; hard backing shifts; master tilts slightly
- Exit: plates physically snap back into registration (~130ms, sharp ease)
- Only the active item separates

## DOM structure

```html
<nav class="prh" aria-label="Site sections">
  <a class="prh__item" href="#projects">
    <span class="prh__backing" aria-hidden="true"></span>
    <span class="prh__plate prh__plate--cyan" aria-hidden="true">PROJECTS</span>
    <span class="prh__plate prh__plate--red" aria-hidden="true">PROJECTS</span>
    <span class="prh__marks" aria-hidden="true">…</span>
    <span class="prh__face">PROJECTS</span>
  </a>
  <!-- ARCHIVE, CONTACT -->
</nav>
```

## Colours

| Token | Value |
| ----- | ----- |
| Black | `#090909` |
| Red | `#e60012` |
| Cyan | `#17b7c5` |
| Paper | `#f5f1e8` |

## Rest offsets (frozen)

| Layer | Translate |
| ----- | --------- |
| Red | `1px 0` |
| Cyan | `-1px 1px` |
| Master | `0 0` |

## Hover / focus (frozen)

| Layer | Final translate | Rotate | Mid overshoot (~110ms) |
| ----- | --------------- | ------ | ---------------------- |
| Red | `12px -4px` | `1.5deg` | `14px -5px` |
| Cyan | `-10px 5px` | `-1deg` | `-12px 6px` |
| Backing | `3px 3px` | — | — |
| Master | `0 -1px` | `-0.5deg` | — |

Entrance ≈`180ms` (`cubic-bezier(0.22, 0.85, 0.32, 1)`).
Exit ≈`130ms` (`cubic-bezier(0.55, 0, 1, 1)`).

Narrow (≤360px): red final `9px -3px`, cyan `-8px 4px`, backing `2px 2px`.

## Registration marks

Two static crosshairs appear only while the item is hovered/focused. No continuous animation.

## Accessibility

- One semantic face label per link
- Decorative plates / backing / marks `aria-hidden`
- `:focus-visible` outline in red (paired with geometry, not colour alone)
- All decorative layers `pointer-events: none`

## Reduced motion

Immediate final misregistration on hover/focus; immediate restore on exit. No travel animation.

## Porting

1. Copy DOM + CSS (CSS-only; no JS required).
2. Keep frozen offsets, rotations, durations, and easings.
3. No React, Tailwind, host tokens, external fonts, or network.
