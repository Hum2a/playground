# Moonrise Reveal (portable recreation spec)

A cinematic but portable moonrise that reveals a destination state.
Rebuild from this document and `contract.json`.

Do **not** reproduce Persona 3 art, logos, fonts, or proprietary assets.

## Composition

- Preview: `620 × 400px`
- Dark sky; horizon at `72%` viewport height
- Moon `120px`, colour `#C7CDD8`, cyan rim `#72D6E8`
- Exactly 18 geometric stars with hardcoded positions
- Destination label: `NIGHT PHASE`

## Animation

Moon: `translateY(110px → -15px)`, opacity `.35 → 1`, `1100ms`, `cubic-bezier(.2,.8,.2,1)`.

As it rises:

- cyan rim brightens
- horizon receives a `220ms` highlight
- label rises `8px` after ~70% of the travel

Label delay `750ms`, duration `320ms`. Starts at `opacity: 0; transform: translateY(8px)`.

At most 5 stars briefly brighten once. No random twinkling. Plays exactly once.

## Reduced motion

Show the final moon position, horizon, stars, and label immediately. No rising animation.

## Accessibility

Root `aria-label="Night phase reveal"`. Sky geometry `aria-hidden`. Label is visible text.

## Porting

Import `demo.css` verbatim. No JavaScript required.
