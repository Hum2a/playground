# Liquid Toggle (portable recreation spec)

Persona 3–inspired **vessel toggle**: ON/OFF is a blue liquid body moving between
two fill levels inside a rectangular tank. Not a pill switch. Original software
control — not a game widget.

```
OFF → [ empty vessel, 18% mute navy ]
ON  → [ filled vessel, 82% cyan + travel ]
```

## Visual intent

- Rectangular 180×68 tank, 2px border, **≤4px** radius
- Liquid rises from the floor; waterline rides the surface
- Brief ±3px wave only while filling/draining; settles static
- ON is slightly more deliberate than OFF

## DOM structure

```
.lt[data-liquid-toggle]
  .lt__kicker
  button.lt__vessel[aria-pressed][data-lt-toggle]
    .lt__liquid
      .lt__waterline
    .lt__label
  .lt__status[role=status]
```

## Copy

| Role | Text |
| --- | --- |
| Kicker | `VESSEL // STATE` |
| Off | `OFF` |
| On | `ON` |
| Status | `Off.` / `On.` |

## Geometry and colour

| Token | Value |
| --- | --- |
| Vessel | `180 × 68px` |
| Border | `2px` `#C7CDD8` |
| Radius | `4px` max |
| Background | `#111827` |
| OFF liquid | `18%` `#236B91` |
| ON liquid | `82%` `#72D6E8` |
| Text | `#E9EEF5` |
| Waterline | `10px` height, amplitude `3px` |

## Timing

| Direction | Duration | Easing |
| --- | --- | --- |
| OFF → ON | `460ms` | `cubic-bezier(.2,.85,.25,1)` |
| ON → OFF | `360ms` | `cubic-bezier(.65,0,.3,1)` |

## API

- `window.liquidToggle.toggle(root)`
- `window.liquidToggle.set(root, on)`
- `window.liquidToggle.init(scope?)`

Native **Space** / **Enter** fire the button click.

## Reduced motion

Jump straight to the target fill. No height travel. No waterline wave. Static
18% or 82% level remains readable.

## Accessibility

`<button>` with `aria-pressed`. Label text changes OFF/ON. Colour is paired with
level + word. `:focus-visible` cyan ring. Polite live region.

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim.
2. Keep 180×68, 2px / 4px, 18%/82%, 460/360ms, waterline 10px ±3px.
3. Honour both reduced-motion triggers.
