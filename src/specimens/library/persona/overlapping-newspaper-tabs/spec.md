# Overlapping Newspaper Tabs (portable recreation spec)

Persona-adjacent tab switcher: four tabs sit overlapped like torn newspaper clippings,
each at its own slight rotation and irregular clip-path edge. Selecting a tab lifts it
above the stack and straightens it; the others stay tilted underneath. This is a real,
keyboard-operable **tablist**, not a decorative carousel.

## Visual intent

- Tabs overlap with negative left margin, layered by source order (`z-index` 1-4)
- Each tab has its own fixed rotation (`-3deg, 2deg, -2deg, 3deg`) and its own irregular
  torn-edge `clip-path` — no two tabs share the same silhouette
- The active tab climbs to the top (`z-index: 10`), lifts (`translateY(-8px)`), scales
  up slightly (`1.06`), and straightens to `rotate(0deg)`, gaining a hard offset backing
  (`4px 4px 0` solid shadow, not blurred) and a red border
- Inactive tabs dim slightly (`opacity: 0.72`) but keep their tilt

## DOM structure

```html
<div class="newspaper-tabs" data-newspaper-tabs>
  <div class="newspaper-tabs__list" role="tablist" aria-label="Sections">
    <button class="newspaper-tabs__tab" role="tab" id="nt-tab-0" aria-selected="true"
      aria-controls="nt-panel-0" tabindex="0" data-newspaper-tab="0">
      <span class="newspaper-tabs__kicker">01</span>
      <span class="newspaper-tabs__label">FRONT PAGE</span>
    </button>
    <!-- …3 more tabs… -->
  </div>
  <div class="newspaper-tabs__panels">
    <div class="newspaper-tabs__panel newspaper-tabs__panel--active" role="tabpanel"
      id="nt-panel-0" aria-labelledby="nt-tab-0">Now viewing: Front Page</div>
    <!-- …3 more panels, hidden… -->
  </div>
</div>
```

This implements the WAI-ARIA APG tabs pattern: `role="tablist"`/`"tab"`/`"tabpanel"`,
`aria-selected`, `aria-controls`/`aria-labelledby`, and roving `tabindex`.

## Copy

| Tab | Kicker | Label | Panel |
| --- | ------ | ----- | ----- |
| 1 | `01` | `FRONT PAGE` | `Now viewing: Front Page` |
| 2 | `02` | `SPORTS` | `Now viewing: Sports` |
| 3 | `03` | `OPINION` | `Now viewing: Opinion` |
| 4 | `04` | `CLASSIFIED` | `Now viewing: Classified` |

## Layout and colour contract

| Token / property | Value | Notes |
| ---------------- | ----- | ----- |
| Ink | `#0d0d0d` | Borders, backing shadow |
| Paper | `#f2eee3` | Tab + panel background |
| Accent | `#d71920` | Active tab border, kicker text |
| Overlap | `-12px` left margin per tab (except first) | |
| Rotations | `-3deg, 2deg, -2deg, 3deg` | Fixed per tab index |
| Active lift | `translateY(-8px) scale(1.06) rotate(0deg)` | |
| Active backing | `box-shadow: 4px 4px 0 #0d0d0d` | Hard offset, no blur |
| Tab transition | `260ms`, `cubic-bezier(0.22, 0.85, 0.2, 1.15)` (transform), `200ms ease` (box-shadow/opacity) | |
| Panel transition | `160ms ease` | Opacity + `translateY(4px → 0)` |

## Phases (JS)

- `selectTab(index, focus?)` — updates `aria-selected` and roving `tabindex` on every
  tab, and toggles `hidden` / `.newspaper-tabs__panel--active` on panels
- Click selects without stealing focus from the pointer; `ArrowLeft` / `ArrowRight` /
  `Home` / `End` move both focus and selection per the APG pattern

## Reduced motion

Keep tab switching fully functional; remove only the lift/scale/rotate transition:

```css
@media (prefers-reduced-motion: reduce) {
  .newspaper-tabs__tab {
    transition: box-shadow 200ms ease, opacity 200ms ease;
  }
  .newspaper-tabs__panel {
    transition: opacity 160ms ease;
  }
}
```

Position/rotation/scale changes apply instantly; box-shadow, opacity, and the panel
cross-fade still transition softly.

## Accessibility

- Full WAI-ARIA APG tabs pattern: `tablist`/`tab`/`tabpanel`, `aria-selected`,
  `aria-controls`/`aria-labelledby`, roving `tabindex`
- Arrow/Home/End keyboard navigation, not click-only
- Do not rely on tilt or clip-path alone to communicate selection — `aria-selected` and
  panel visibility are the source of truth

## Porting to another stack

1. Copy the DOM + CSS + tiny JS (or generate from `contract.json`).
2. Keep the tablist/tab/tabpanel roles and roving tabindex intact — do not simplify to
   plain `<div>` clicks.
3. Recompute `aria-selected` and panel `hidden` state via `selectTab`; do not add/remove
   tab or panel nodes.
4. Wire reduced-motion the same way (media query + optional force attribute) by
   dropping `transform` from the tab transition list.
5. Swap section labels/kickers/panel copy per product; four tabs and their fixed
   rotations/clip-paths are the tested contract, but the technique generalises.
6. No React, Tailwind, or host design tokens are required for the CSS effect itself.
