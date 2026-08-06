# Objective Acquired (portable recreation spec)

New-objective announcement: independent graphic pieces rapidly assemble into a
persistent objective card. Rebuild from this document, `demo.css`, `demo.js`, and
`contract.json`. No external assets.

## Visual intent

- Begins absent; at least five pieces assemble from multiple directions
- Red strip (left) + black panel (right) overlap with misregistration
- Dominant title `BUILD THE ARCHIVE` slams up with ~5px overshoot
- Progress `0 / 50` attaches late; two corner pins finish with ±2px card shift
- **Remains static afterward** — announcement becomes persistent UI
- Nothing loops

## DOM structure

```html
<div class="objective-acquired-demo">
  <button data-objective-acquired-trigger>ADD OBJECTIVE</button>
  <div class="objective-acquired" data-objective-acquired hidden>
    <p role="status" aria-live="polite" data-objective-acquired-status></p>
    <div class="objective-acquired__card">
      <div class="objective-acquired__strip" aria-hidden="true"></div>
      <div class="objective-acquired__panel" aria-hidden="true"></div>
      <div class="objective-acquired__content">…eyebrow / title / desc / progress…</div>
      <span class="objective-acquired__pin objective-acquired__pin--tl" aria-hidden="true"></span>
      <span class="objective-acquired__pin objective-acquired__pin--tr" aria-hidden="true"></span>
    </div>
  </div>
</div>
```

Card width: `min(90%, 380px)`.

## Colours

| Token | Hex |
| ----- | --- |
| Black | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Timing (850ms)

| Piece | Window |
| ----- | ------ |
| Red strip | 0–160ms |
| Black panel | 80–260ms |
| NEW OBJECTIVE | 180–380ms |
| BUILD THE ARCHIVE | 260–480ms |
| Description | 400–620ms |
| 0 / 50 | 520–700ms |
| Pins | 680–850ms |

Easing: `cubic-bezier(0.7, 0, 0.3, 1)`.

## API

```js
export function acquireObjective() { /* … */ }
export function clearObjective() { /* … */ }
export function replayObjective() { /* … */ }
```

Announce once: `New objective: Build the Archive. Create 50 portable specimens.`

## Reduced motion

Both repository triggers: show final card immediately.

## Porting checklist

1. Copy markup, CSS, JS
2. Wire ADD OBJECTIVE → `replayObjective` (or acquire once)
3. Verify multi-direction assembly, late progress, pin impacts, persistence
4. Verify both RM triggers
