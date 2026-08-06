# Bottom Sheet Detent Snap (portable recreation spec)

Draggable bottom sheet with three fixed semantic detents. Physical settling between
states — not generic modal movement. Progressive content reveal per detent. No images,
audio, network, or storage.

## Visual intent

Host map context with ROUTE DETAILS sheet. Sheet height snaps to collapsed / medium /
expanded visible heights with restrained spring overshoot.

## DOM structure

```html
<div class="bsd" data-bottom-sheet-detent>
  <p class="bsd__host-label">MAP // ROUTE 04</p>
  <div class="bsd__stage">
    <div class="bsd__map"></div>
    <div class="bsd__sheet" data-bsd-sheet>
      <div class="bsd__grab" data-bsd-grab>
        <span class="bsd__handle"></span>
      </div>
      <div class="bsd__sheet-inner">
        <h2>ROUTE DETAILS</h2>
        <p class="bsd__summary">…</p>
        <div class="bsd__metrics" data-bsd-metrics>…</div>
        <ol class="bsd__steps" data-bsd-steps>…</ol>
      </div>
    </div>
  </div>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Host | `MAP // ROUTE 04` |
| Sheet | `ROUTE DETAILS` |
| Summary | `North loop · 4.2 km · moderate grade` |

## Layout contract

| Token | Value |
| ----- | ----- |
| Preview height | 600px |
| Sheet width | 100% |
| Collapsed visible | 112px |
| Medium visible | 318px |
| Expanded visible | 520px |
| Top corners | 18px |
| Handle | 36 × 5px |
| Velocity threshold | 0.55 px/ms |
| Spring settle | ~320ms, overshoot ≤8px |
| Reduced snap | 160ms, no overshoot |

## Content by detent

- Collapsed: title + summary only
- Medium: adds route metrics
- Expanded: adds step list
- Progressive reveal — no DOM swap

## API

- `resetBottomSheetDetentSnap()`

## Reduced motion

Dragging remains direct. Release snaps 160ms without overshoot; forced RM immediate.

## Accessibility

Status region announces detent. Map decorative `aria-hidden`.
