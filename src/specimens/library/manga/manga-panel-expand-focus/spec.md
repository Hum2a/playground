# Panel Expand Focus (portable recreation spec)

Four black-bordered manga panels begin with roughly equal importance on warm
paper. Promoting one panel replates the composition so that frame dominates
(~68%) while the remaining three compress into a visible subordinate stack
(~32%). Feels like changing panel hierarchy, not a modal or accordion.

## Visual intent

Original abstract page composition. Ink borders, no radius, warm off-white
paper. Selected heading scales up; secondary panel copy is suppressed.

## DOM structure

```html
<div class="mpe" data-manga-panel-expand-focus data-layout="equal" data-active="0">
  <div class="mpe__stage" role="group" aria-label="Manga panel composition">
    <button type="button" class="mpe__panel is-active" data-panel="0" aria-pressed="true">…</button>
    <button type="button" class="mpe__panel" data-panel="1" aria-pressed="false">…</button>
    <button type="button" class="mpe__panel" data-panel="2" aria-pressed="false">…</button>
    <button type="button" class="mpe__panel" data-panel="3" aria-pressed="false">…</button>
  </div>
  <p class="mpe__status" role="status" aria-live="polite" data-mpe-status></p>
</div>
```

## Copy

| Panel | Heading | Role |
| ----- | ------- | ---- |
| 01 | INK | Primary beat |
| 02 | GUTTER | Counter beat |
| 03 | BLEED | Quiet panel |
| 04 | TOME | Closing beat |

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `620 × 400px`, `overflow: hidden` |
| Paper | `#F4F1E8` |
| Ink | `#111111` |
| Panels | `4` |
| Border | `4px` solid ink, no radius |
| Gutter | `8px` |
| Dominant region | `~68%` |
| Secondary region | `~32%` |
| Transition | `520ms` |
| Easing | `cubic-bezier(0.22, 0.8, 0.2, 1)` |
| Selected heading scale | `1.45` |
| Secondary content opacity | `0.42` |

## Interaction

- All panels are focusable buttons.
- Click or Enter/Space promotes the panel (`data-layout="focus"`, `data-active`, `is-active`).
- Exactly one panel is `aria-pressed="true"` at a time.

## Reduced motion

Honour both `prefers-reduced-motion: reduce` and
`html[data-force-reduced-motion="true"]` by disabling geometry/opacity
transitions so layout swaps immediately.

## API

- `promoteMangaPanelExpandFocus(index)`
- `resetMangaPanelExpandFocus()` — returns to equal 2×2 with panel 01 selected
