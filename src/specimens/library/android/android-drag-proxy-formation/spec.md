# Drag Proxy Formation (portable recreation spec)

Rich 300×92 file row condenses into a 156×48 proxy (icon + title only) after 7px
drag. Source keeps a 92px placeholder; proxy follows pointer with 8px offset and
scale 1.03.

## DOM structure

```html
<div class="adpf" data-android-drag-proxy>
  <article class="adpf__row" data-adpf-row>FIELD NOTES …</article>
  <div class="adpf__drop" data-adpf-drop="valid">INBOX</div>
  <div class="adpf__drop" data-adpf-drop="invalid">LOCKED</div>
  <div class="adpf__proxy" data-adpf-proxy hidden>…</div>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Source row | `300 × 92px` |
| Drag threshold | `7px` |
| Proxy | `156 × 48px`, scale `1.03` |
| Pointer offset | `8px` |
| Valid target | 2px border when proxy centre enters |
| Invalid return | `220ms` |

## Reduced motion

Proxy formation and return happen instantly.

## API

- `resetAndroidDragProxyFormation()`

## Accessibility

Source row focusable; status `aria-live="polite"`.
