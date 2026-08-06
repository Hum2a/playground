# Channel Tuning Scrub

Persona 4–adjacent midnight-channel interaction: dragging a tuning dial moves through unstable analogue fragments before a target broadcast locks in.

## Visual intent

- CRT screen with flickering static noise at low dial values
- Partial stabilisation in the mid range (ghosted content, reduced static)
- Clean locked broadcast at high dial values (channel label + title)
- Palette: `#F5C400`, `#101010`, `#F7F3E8`, `#E8E8E8`

## DOM structure

```html
<div class="cts" data-cts data-phase="noise|partial|locked">
  <p class="cts__live" data-cts-live aria-live="polite">…</p>
  <div class="cts__screen">
    <div class="cts__static"></div>
    <div class="cts__content">…</div>
    <div class="cts__scanlines"></div>
  </div>
  <label class="cts__dial">
    <input type="range" data-cts-range min="0" max="100" />
  </label>
</div>
```

## Interaction

- Range input drives `data-phase` on the root via thresholds (partial ≥ 42, locked ≥ 78)
- Live region announces signal state changes

## Reduced motion

Stop static flicker animation and content transitions under:

- `@media (prefers-reduced-motion: reduce)`
- `[data-force-reduced-motion="true"]`

Static effect remains visible at each phase.

## Accessibility

- Range input has visible `:focus-visible` ring
- State changes announced via `aria-live="polite"` region
- Decorative screen layers use `aria-hidden` where appropriate

## Porting

1. Copy DOM + CSS verbatim.
2. Wire range `input` to phase thresholds.
3. Honour both reduced-motion triggers.
