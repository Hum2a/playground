# Matched Card Expansion (portable recreation spec)

A compact project card (`ORBIT`) continuously becomes a detail surface while
preserving identity-bearing geometry. No cross-fade between unrelated layouts.
Three-card grid: ORBIT · ATLAS · NOVA.

## Visual intent

Shared-element expansion. The ORBIT title persists and grows; card border becomes
the detail boundary; metadata redistributes; sibling cards recede.

## DOM structure

```html
<div class="mce" data-matched-card-expansion data-phase="grid">
  <div class="mce__grid">
    <button class="mce__card mce__card--orbit" data-mce-orbit-card>ORBIT</button>
    <div class="mce__card mce__card--atlas">ATLAS</div>
    <div class="mce__card mce__card--nova">NOVA</div>
  </div>
  <div class="mce__layer" data-mce-layer hidden>
    <h2 data-mce-title>ORBIT</h2>
    <div data-mce-detail><!-- status, metrics, description --></div>
    <button data-mce-close>CLOSE</button>
  </div>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Cards | ORBIT · ATLAS · NOVA |
| CTA | `OPEN ORBIT` |
| Close | `CLOSE` |
| ORBIT meta | `Active · 3 tasks` |

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `520 × 520px` |
| ORBIT card | `180 × 118px` |
| Detail inset | `20px` (final `480 × 480px`) |
| Expand duration | `460ms` |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Title size | `20px → 34px` |
| Sibling recede | `scale(0.96) translateY(8px)` over `180ms` |
| Detail reveal | after `55%` progress (`253ms`) |

## Reduced motion

Instant swap between card and detail with short opacity/outline change; no
large-scale movement.

## API

- `openMatchedCardExpansion()`
- `closeMatchedCardExpansion()`
- `resetMatchedCardExpansion()`

## Accessibility

ORBIT button has `aria-expanded` and `aria-controls`. Status region is polite.
ATLAS/NOVA cards are decorative (`aria-hidden`).

## Porting

Import `demo.css` verbatim. Freeze start bounds from measured card rect; animate
transition layer to inset detail bounds. CLOSE reverses to frozen rect.
