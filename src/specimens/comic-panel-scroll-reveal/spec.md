# Comic Panel Scroll Reveal (portable recreation spec)

Persona-adjacent scroll reveal where opposing irregular comic panels separate
as each section enters an **internal** scroll container. Rebuild from this
document and `contract.json`.

Do **not** reproduce Persona 5 layouts, art, logos, fonts, or proprietary assets.

## Visual intent

- Internal scroll region (~380px tall) — demo does **not** depend on parent scroll
- Three sections: `01 // MOTION`, `02 // TYPOGRAPHY`, `03 // INTERACTION`
- Each section starts covered by left + right black panels (+ red backing / shards)
- At ~35% intersection with the internal scroller, panels tear away once
- Scrolling back does **not** re-cover revealed sections
- Reduced motion: covers never obscure content

## DOM structure

```html
<div class="cpsr" data-comic-panel-scroll>
  <div class="cpsr__scroller" data-cpsr-scroller tabindex="0"
    role="region" aria-label="Comic panel scroll preview">
    <!-- intro spacer -->
    <section class="cpsr__section cpsr__section--v0" data-cpsr-section>
      <div class="cpsr__body">
        <h2 class="cpsr__heading">01 // MOTION</h2>
        <p class="cpsr__copy">…</p>
      </div>
      <div class="cpsr__cover" aria-hidden="true">
        <span class="cpsr__backing"></span>
        <span class="cpsr__panel cpsr__panel--left"></span>
        <span class="cpsr__panel cpsr__panel--right"></span>
        <span class="cpsr__shard cpsr__shard--a"></span>
        <span class="cpsr__shard cpsr__shard--b"></span>
      </div>
    </section>
    <!-- v1 TYPOGRAPHY, v2 INTERACTION -->
  </div>
</div>
```

## Colours

| Token | Value |
| ----- | ----- |
| Black | `#090909` |
| Paper | `#f5f1e8` |
| Red | `#e60012` |

## Observer (frozen)

| Property | Value |
| -------- | ----- |
| `root` | internal `.cpsr__scroller` only |
| `threshold` | `0.35` |
| Once | yes — `unobserve` after reveal |

Never read parent scroll or parent DOM.

## Reveal choreography (~520ms)

1. **0–100ms** — centre seam widens ≈`0 → 8px` (each panel ±4px)
2. **80–380ms** — left `translate(-105%, -8%) rotate(-6deg)`; right `translate(105%, 7%) rotate(8deg)` (v1/v2 use frozen variants)
3. **180–450ms** — red backing/shards exit (~35ms lag via `215ms` delay into a 270ms exit)
4. **380–520ms** — heading `translateY(5px → 0)`

Body copy does not stagger-animate; the mask is the hero.

## Direction variants (frozen clip-paths)

| Section | Split language |
| ------- | -------------- |
| v0 MOTION | Horizontal irregular centre seam |
| v1 TYPOGRAPHY | Upper-left / lower-right |
| v2 INTERACTION | Lower-left / upper-right |

Exact polygons live in `demo.css` / `contract.json`.

## Reset

Harness `{ type: 'restart' }` or `resetComicPanelScroll()`:

- `scrollTop = 0`
- remove revealed state from all sections
- re-arm IntersectionObserver (unless reduced motion)

## Reduced motion

Covers are not shown (`display: none`). Content is immediately readable. No observer animation path required.

## Accessibility

- Semantic headings + paragraphs remain in the accessibility tree under covers
- Cover layers `aria-hidden`
- Scroller is a focusable `region` for keyboard scrolling

## Porting

1. Copy DOM + CSS + JS (or generate from `contract.json`).
2. Keep observer rooted to the specimen scroller; threshold `0.35`.
3. Call `resetComicPanelScroll()` on replay.
4. No scroll libraries, React, Tailwind, host tokens, network, or parent access.
