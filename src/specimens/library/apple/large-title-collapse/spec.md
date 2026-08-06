# Large Title Collapse (portable recreation spec)

Scroll-driven iOS-style large title transition: `PROJECTS` condenses from 42px into a
17px compact navigation title while list content scrolls underneath. Collapse range
0–84px scroll; compact established by 72px. No images, audio, network, or storage.

## Visual intent

One identity-bearing title handoff: large hero title translates up 54px and shrinks
while compact nav title fades in. Subtitle `12 ACTIVE` recedes with collapse.

## DOM structure

```html
<div class="ltc" data-large-title>
  <header class="ltc__nav"><span class="ltc__compact">PROJECTS</span></header>
  <div class="ltc__scroll">
    <h1 class="ltc__large">PROJECTS</h1>
    <p class="ltc__subtitle">12 ACTIVE</p>
    <!-- 12 list rows -->
  </div>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Title | `PROJECTS` |
| Subtitle | `12 ACTIVE` |
| Rows | ORBIT · ATLAS · NOVA · … (12 total) |

## Layout

| Property | Value |
| -------- | ----- |
| Scroll viewport | 380 × 500px |
| Nav bar height | 52px |
| Large title size | 42px |
| Compact title size | 17px |
| Collapse range | scrollY 0–84px |
| Compact established | 72px |
| Large translateY | −54px at full collapse |

## API

- `resetLargeTitleCollapse()`

## Reduced motion

Scroll-linked state changes without interpolated scale movement; discrete font/opacity steps.

## Accessibility

Scroll region is focusable; status announces collapse phase.
