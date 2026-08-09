# Refraction Hover (portable recreation spec)

Persona 3–inspired interactive dossier card. On hover or keyboard focus, two
angular light panes separate across the card, suggesting refracted glass while
the card’s single semantic label remains readable.

Do not reproduce Persona art, logos, or proprietary assets.

## Visual intent

- One `280 × 170px` rectangular glass card
- Dark blue glass surface with a pale edge, cyan pane, and violet pane
- Hover/focus lifts the card 3px and splits the panes in opposing directions
- The effect is static after its short entrance; it never loops or flickers
- Refraction comes from `::before` / `::after` clipped geometry only: no filters or canvas

## DOM structure

```html
<section class="rh" aria-label="Refraction card demonstration">
  <a class="rh__card" href="#case-file">
    <span class="rh__index">03 / GLASS</span>
    <strong class="rh__title">CASE FILE</strong>
    <span class="rh__detail">ENTER ARCHIVE</span>
    <span class="rh__corner rh__corner--top" aria-hidden="true"></span>
    <span class="rh__corner rh__corner--bottom" aria-hidden="true"></span>
  </a>
</section>
```

## Frozen values

| Token | Value |
| --- | --- |
| Card | `280 × 170px` |
| Rest cyan pane | `translate(-8px, 6px)` |
| Rest violet pane | `translate(7px, -5px)` |
| Active cyan pane | `translate(17px, -8px)` |
| Active violet pane | `translate(-17px, 10px)` |
| Enter | `220ms` `cubic-bezier(.18,.85,.28,1)` |
| Exit | `140ms` `cubic-bezier(.6,0,.9,.4)` |

## Accessibility

- The card is one real link, with no duplicate text nodes.
- `:focus-visible` triggers the same state as hover and exposes a 2px cyan outline.
- Corner marks and pseudo-element panes are decorative and cannot receive pointer input.
- The visible words and focus outline communicate the interaction without relying on colour.

## Reduced motion

Under `prefers-reduced-motion: reduce` and
`[data-force-reduced-motion="true"]`, hover/focus immediately shows the same
final refracted state. No transition remains.

## Porting

1. Copy `demo.html` and `demo.css` verbatim.
2. Preserve the 280×170px geometry and the `::before` / `::after` panes.
3. Do not add filters, canvas, JavaScript, host tokens, or external assets.
