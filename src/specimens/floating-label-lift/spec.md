# Floating Label Lift (portable recreation spec)

Outlined text field where the same label relocates from centred 16px type to
floated 12px type with background patch interrupting the outline.

## DOM structure

```html
<div class="fll__field" data-fll-field>
  <input class="fll__input" id="fll-email" data-fll-input />
  <label class="fll__label" for="fll-email">Email address</label>
  <span class="fll__outline"></span>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Field | `300 × 58px` |
| Label rest | `x=16px`, centred vertically, `16px` type |
| Label float | `y=-7px`, `x=12px`, `12px` type, surface patch |
| Transition | `180ms` |
| Border | `1px` neutral → `2px` active on focus/fill |
| Error | supporting text below without moving label |

## Reduced motion

Label position changes instantly.

## API

- `resetFloatingLabelLift()`

## Accessibility

Real `<label for>` focuses input; no placeholder-as-label.
