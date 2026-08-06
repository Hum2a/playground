# Translucent Material Lift (portable recreation spec)

Dense document grid host with floating `FILTERS` panel using semi-transparent
material, inner highlight, and outer border. `backdrop-filter` is progressive
enhancement; panel remains legible without blur.

## Visual intent

Panel 286×214px. On OPEN: translate 8→0, scale .985→1, host scale .995,
duration 220ms. Exactly one inner highlight line and one outer border. No giant
shadow. Rows: STATUS, OWNER, DATE.

## DOM structure

```html
<div class="tml" data-translucent-material>
  <div class="tml__host" data-tml-host><!-- grid --></div>
  <dialog class="tml__panel" data-tml-panel>
    <div class="tml__panel-outer">
      <div class="tml__panel-inner">FILTERS rows</div>
    </div>
  </dialog>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Panel | 286×214px |
| Open duration | 220ms |
| Translate | 8px → 0 |
| Scale | .985 → 1 |
| Host scale | .995 |
| Boundaries | 1 outer + 1 inner highlight |

## Reduced motion

No scale/translation; material state appears immediately.

## API

- `openTranslucentPanel()`
- `closeTranslucentPanel()`
- `resetTranslucentMaterialLift()`

## Accessibility

Dialog with labelled title. Status region announces open/close.

## Porting

Import `demo.css` verbatim. Semi-transparent fallback colours required without blur.
