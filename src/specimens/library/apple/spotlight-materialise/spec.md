# Spotlight Materialise (portable recreation spec)

A central search surface materialises from a compact 44×44 seed. Background
panels recede; input bar establishes before results expand. Four generic command
results reveal with stagger. ESC closes and restores focus. No images, audio,
network, or storage.

## Visual intent

Command-search focus — original styling, generic results, no branded Spotlight
chrome.

## DOM structure

```html
<div class="smt" data-spotlight-materialise data-phase="closed">
  <div data-smt-desktop><!-- 3 panels --></div>
  <button data-smt-trigger></button>
  <div data-smt-panel hidden>
    <input placeholder="Search commands" />
    <ul><!-- 4 results --></ul>
  </div>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Placeholder | `Search commands` |
| Results | Open Project · Run Build · View Logs · Deploy Release |

## Frozen geometry

| Token | Value |
| ----- | ----- |
| Panel final | 520 × 286px |
| Seed | 44 × 44px |
| Bar height | 58px |
| Bar expand | 180ms |
| Results expand | 160ms |
| Result stagger | 30ms |
| Background scale | 0.985 |

## API

- `openSpotlightMaterialise()`
- `closeSpotlightMaterialise()`

## Reduced motion

Open final panel immediately; focus semantics preserved.

## Accessibility

Trigger `aria-expanded` / `aria-controls`; input receives focus on open; ESC
closes and restores focus to trigger.
