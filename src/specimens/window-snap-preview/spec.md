# Window Snap Preview (portable recreation spec)

Dragging a floating window near a layout region previews its potential final
bounds before commit. Left snap target equals 50% desktop width.

## Visual intent

Desktop 520×380. Window EDITOR 260×190. Left activation zone 54px.
Preview inset 10px, width (desktopWidth−30)/2, height desktopHeight−20.
Preview constructs 120ms; leaving removes in 90ms; commit 260ms.

## DOM structure

```html
<div class="wsp" data-window-snap-preview data-phase="idle">
  <div class="wsp__desktop" data-wsp-desktop>
    <div data-wsp-preview hidden></div>
    <div data-wsp-window>EDITOR</div>
  </div>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Window | `EDITOR` |

## Frozen geometry

| Token | Value |
| ----- | ----- |
| Desktop | 520 × 380px |
| Window | 260 × 190px |
| Activation zone | 54px |
| Preview inset | 10px |
| Preview in/out | 120ms / 90ms |
| Commit | 260ms |

## API

- `resetWindowSnap()`

Pointer drag on window is built-in.

## Reduced motion

Preview and commit appear instantly.

## Accessibility

Window is focusable with visible focus ring. Status uses `aria-live="polite"`.
