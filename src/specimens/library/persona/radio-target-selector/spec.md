# Radio Target Selector (portable recreation spec)

Three native radios styled as corner-bracket targets. Selection converges
inward, stamps a central diamond, and fires a one-shot ring. Rebuild from
this document and `contract.json`. CSS-only.

Do **not** reproduce Persona 5 art, logos, fonts, or proprietary assets.

## Composition

- Exactly 3 native `<input type="radio">` with the same `name`
- Labels: `OPTION A` · `OPTION B` · `OPTION C`
- Custom target — not circular radio chrome
- Each target: 4 faint corner brackets

Colours: background `#111827`, target `#236B91`, active `#72D6E8`,
text `#E9EEF5`.

## Motion

On `:checked`:

- Brackets converge inward `6px` over `320ms`
- Central diamond `scale(0 → 1)`
- Ring `scale(.7 → 1.5)`, opacity `1 → 0`, `260ms`, once

Switching options restarts the ring via `:checked` (no JS).

## Keyboard

Native radio group: arrow keys move selection, Space checks the focused
option.

## Reduced motion

Selected target and diamond appear immediately. No converge, no ring.

## Porting

Import `demo.css` verbatim. No JavaScript.
