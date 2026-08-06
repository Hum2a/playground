# App Launch Expansion (portable recreation spec)

A 3×3 grid tile launches into a full-surface destination. App 05 expands from
its exact measured bounds over 430ms while sibling tiles recede. Destination
header ANALYTICS reveals after 58%. Close contracts to the exact slot. No
images, audio, network, or storage.

## Visual intent

Shared-origin launch — glyph scales to 1.18 then becomes header identity; corner
radius morphs 18px → 0.

## DOM structure

```html
<div class="ale" data-app-launch-expansion data-phase="grid">
  <div data-ale-grid><!-- 9 tiles --></div>
  <div data-ale-layer hidden>ANALYTICS detail</div>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Target tile | `APP // 05` |
| Destination | `ANALYTICS` |

## Frozen geometry

| Token | Value |
| ----- | ----- |
| Tile | 72 × 72px |
| Grid gap | 22px |
| Preview | 300 × 380px |
| Corner radius | 18px → 0 |
| Expand duration | 430ms |
| Recede duration | 180ms |
| Detail reveal | 58% (249ms) |
| Glyph peak scale | 1.18 |

## API

- `launchAppExpansion()`
- `closeAppExpansion()`

## Reduced motion

Direct grid/detail swap with outline — no large spatial travel.

## Accessibility

Launch via App 05 tile; CLOSE returns to grid. Status via `aria-live`.
