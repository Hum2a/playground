# Search Bar-to-View Transform (portable recreation spec)

320×56 search bar inside a 360×560 catalogue scaffold expands into a 344×500
search view. Radius 28px→24px; icon shifts 8px left; results after 140ms.

## DOM structure

```html
<div class="sbvt" data-phase="compact">
  <div class="sbvt__host">…catalogue…</div>
  <button class="sbvt__trigger">Search specimens</button>
  <div class="sbvt__search">…input + results…</div>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Compact bar | `320 × 56px`, radius `28px` |
| Expanded view | `344 × 500px`, radius `24px` |
| Icon shift | `8px` left on expand |
| Results delay | `140ms` after expanded |
| Back/Escape | collapses and restores scroll |

## Reduced motion

Immediate container geometry switch.

## API

- `resetSearchBarToViewTransform()`

## Accessibility

Focus moves to input after expansion; host inert while expanded.
