# Material Switch Toggle (portable recreation spec)

Three original switches demonstrating off, on, and disabled states. Interactive
switch uses a native checkbox; thumb travels exactly 20px with track fill over
180ms.

## DOM structure

```html
<label class="mst__switch">
  <input class="mst__input" type="checkbox" />
  <span class="mst__track"><span class="mst__thumb">…</span></span>
  <span class="mst__label">Notifications</span>
</label>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Track | `52 × 32px` |
| Thumb | `24px` diameter |
| Thumb travel | `20px` |
| Track transition | `180ms` |
| Thumb pulse | `1 → 1.08 → 1` on activation |
| Ripple | `40px` unbounded, centred on thumb |
| Disabled | non-interactive third row |

## Reduced motion

Thumb jumps to target position; no scale or ripple travel.

## API

- `resetMaterialSwitchToggle()`

## Accessibility

Native checkbox semantics; `Space` toggles; `:focus-visible` ring on track.
