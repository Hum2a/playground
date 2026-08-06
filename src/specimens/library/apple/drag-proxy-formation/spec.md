# Drag Proxy Formation (portable recreation spec)

When dragging a complex object, condense it into a portable representation rather
than moving the entire original layout card. Source card `REPORT // Q3` with drop
zone `ARCHIVE`.

## DOM structure

```html
<div class="dpf" data-drag-proxy-formation>
  <article class="dpf__card" data-dpf-card>REPORT // Q3 …</article>
  <div class="dpf__drop" data-dpf-drop>ARCHIVE</div>
  <div class="dpf__proxy" data-dpf-proxy hidden>…</div>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Source card | `260 × 150px` |
| Drag threshold | `6px` movement |
| Proxy formation | `260×150 → 116×64` over `140ms` |
| Hierarchy collapse | remove UPDATED first, then charts; keep title + pages |
| Pointer offset | `8px` |
| Drop zone | reacts when proxy centre enters bounds |
| Valid drop | absorption semantics |
| Cancel | proxy returns and merges with placeholder |

## Reduced motion

Fixed compact proxy immediately with no formation morph.

## API

- `resetDragProxyFormation()`

## Accessibility

Source card focusable; status region `aria-live="polite"`. Proxy decorative while dragging.
