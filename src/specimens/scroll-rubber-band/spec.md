# Scroll Rubber Band (portable recreation spec)

Non-linear resistance when an `ACTIVITY LOG` list is pulled beyond its top
scroll boundary, followed by a damped spring return. No refresh, spinner, or
network. Twelve fixed rows; start at scroll top.

## Visual intent

Boundary physics only. Content does not move 1:1 with the finger — overscroll
compresses through an exponential curve. A restrained top boundary stretches as
pull increases; a `RELEASE` marker appears at sufficient displacement.

## DOM structure

```html
<div class="srb" data-scroll-rubber-band>
  <div class="srb__viewport" data-srb-viewport>
    <div class="srb__boundary" data-srb-boundary>
      <span class="srb__release" data-srb-release>RELEASE</span>
    </div>
    <div class="srb__inner" data-srb-inner>
      <h2>ACTIVITY LOG</h2>
      <!-- 12 fixed rows -->
    </div>
  </div>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Title | `ACTIVITY LOG` |
| Release marker | `RELEASE` |
| Rows | 12 fixed timestamp + event pairs |

## Viewport

`360 × 440px` scrollable card.

## Overscroll contract

When `scrollTop === 0` and the user drags downward:

| Parameter | Value |
| --------- | ----- |
| Resistance | `displayOffset = 90 × (1 − exp(−dragDistance / 120))` |
| Max displayed overscroll | `90px` |
| Boundary stretch | `0 → 24px` proportional to offset / 90 |
| RELEASE marker | visible at `≥ 60px` displayed overscroll |
| Release settle | ~`420ms` damped spring |
| Max overshoot after release | `≤ 4px` (content briefly above rest) |
| Refresh | none |

## Reduced motion

At most `12px` static resisted displacement; return immediately on release
(no spring).

## API

- `calcDisplayOffset(dragDistance)`
- `resetScrollRubberBand()`

## Accessibility

Viewport is focusable; status region announces overscroll depth. Boundary and
release marker are decorative (`aria-hidden`).

## Porting

Import `demo.css` verbatim. Wire pointer + wheel handlers on the viewport.
Preserve formula constants in `contract.json`.
