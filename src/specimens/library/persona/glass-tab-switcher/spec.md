# Glass Tab Switcher (portable recreation spec)

Persona 3–inspired **three-tab switcher**: a dark glass rail carries a moving,
translucent selection pane. The control is a compact navigation surface, not a
segmented toggle.

## Visual intent

- Three equal-width labels: `Status`, `Records`, and `System`
- Dark blue-black field with a fine, pale glass outline
- A translucent pane slides beneath the active tab; its pale edge and selected
  text identify the state without relying on colour alone
- The matching content panel changes beneath the rail

## DOM structure

```
.gts[data-glass-tab-switcher]
  .gts__kicker
  .gts__tablist[role=tablist]
    .gts__indicator
    button.gts__tab[role=tab][aria-selected][aria-controls]
  .gts__panel[role=tabpanel][aria-labelledby]
```

## Interaction and accessibility

- Exactly one tab has `aria-selected="true"` and `tabindex="0"`.
- All tabs are native buttons with `role="tab"`; native Space and Enter activate
  the focused tab.
- Right and Left arrows wrap through the tabs; Home selects the first and End
  selects the last. Each key both focuses and activates its destination.
- Every tab uses `aria-controls` to reference a labelled `role="tabpanel"`.
  Inactive panels use `hidden`.
- Each focusable tab has a visible `:focus-visible` 2px cyan ring.

## Motion

The indicator translates over 280ms and the newly visible panel lifts 5px into
place over 240ms. Under either reduced-motion trigger, the selected state and
panel update immediately with no indicator or content animation.

## API

- `window.glassTabSwitcher.init(scope?)`
- `window.glassTabSwitcher.set(root, index)`

## Porting

1. Copy `demo.html`, `demo.css`, and `demo.js` verbatim.
2. Preserve the three-tab ARIA relationship and roving tabindex.
3. Honour both reduced-motion triggers; retain the static selected pane and
   visible panel.
