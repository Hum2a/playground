# Dual Activity Split (portable recreation spec)

One compact status region represents a single foreground upload task. A second
concurrent timer task causes the region to divide into two meaningful activity
zones. No images, audio, network, or storage.

## Visual intent

Original dark capsule regions — not Apple Dynamic Island artwork. Upload identity
stays on the left region throughout.

## DOM structure

```html
<div class="das" data-dual-activity data-state="single">
  <div class="das__track">
    <div class="das__main"><!-- progress + label --></div>
    <span class="das__bridge"></span>
    <div class="das__secondary"><!-- timer digits --></div>
  </div>
  <button data-das-start>START TIMER</button>
  <button data-das-end>END TIMER</button>
</div>
```

## Copy

| Role | Single | Split left | Split right |
| ---- | ------ | ---------- | ----------- |
| Upload | `UPLOAD // 64%` | `UPLOAD 64%` | — |
| Timer | — | — | `04:12` |

## Geometry

| Phase | Main | Gap | Secondary | Total |
| ----- | ---- | --- | --------- | ----- |
| Single | 196×40 | 0 | 0 | 196px |
| Split | 126×40 | 12px | 58×40 | 196px |

Split animation: **320ms**. Bridge visible first **90ms** only.

## Timer digits

Constructed with vertical clipping (`overflow: hidden` + `translateY` reveal).
Static value `04:12` — no continuous decorative loop.

## API

- `startDualActivitySplit()`
- `endDualActivitySplit()`
- `resetDualActivitySplit()`

## Reduced motion

Immediately switch between single and dual layouts.

## Accessibility

Polite status announces single vs dual state. Progress bar and bridge are
decorative (`aria-hidden`).
