# Current Direction Indicator (portable recreation spec)

A compact water-current channel inspired by Persona 3 Reload's cool technical
interface language. Three calm curved flow lines sit behind seven travelling
chevrons, making the current direction readable at a glance.

## DOM structure

```html
<div class="current" data-current-direction data-direction="east">
  <div class="current__channel" aria-hidden="true">
    <!-- 3 .current__flow lines -->
    <div class="current__markers">
      <!-- exactly 7 .current__chevron markers -->
    </div>
  </div>
  <div class="current__readout">CURRENT / <strong>East</strong></div>
  <button data-current-reverse>Reverse current</button>
  <p aria-live="polite">Current travelling East.</p>
</div>
```

## Layout and movement contract

- Channel: **480 × 72px**, bordered dark-blue utility panel
- Flow lines: exactly **three** static, shallow curved rules
- Markers: exactly **seven**, each **24 × 24px**
- Default: East (left-to-right), **1.8s**, `linear`, infinite, seamless loop
- Reverse: semantic label becomes West, chevrons face left, and
  `animation-direction: reverse` changes travel without recreating the element
  or resetting its animation timeline

## Colour contract

| Role | Hex |
| --- | --- |
| Ink | `#061826` |
| Deep panel | `#0A314B` |
| Current blue | `#7CE4F2` |
| Pale label | `#D8FBFF` |

## Reduced motion

Under either `prefers-reduced-motion: reduce` or
`data-force-reduced-motion="true"`, the marker track is static. The curved
lines, chevron orientation, and visible East/West label remain so direction is
still clear.

## Accessibility

- Decorative channel, flow rules, and chevrons are `aria-hidden`
- The Reverse current button has a visible focus ring
- Direction changes are announced through an `aria-live="polite"` status

## Porting checklist

1. Preserve the authored 480 × 72 channel and exact counts.
2. Keep three flow lines static; only the marker track travels.
3. Use animation direction, not a remount or animation-name swap, for reverse.
4. Retain both reduced-motion triggers and the explicit textual direction.
