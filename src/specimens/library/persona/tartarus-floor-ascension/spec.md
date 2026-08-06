# Tartarus Floor Ascension (portable recreation spec)

Vertical progress/navigation: stacked architectural slabs ascend so the current
floor rises toward and past the viewer while the next floor rises from below and
locks. Inspired by Tartarus progression — no Persona assets. Rebuild from this
document, `demo.css`, `demo.js`, and `contract.json`.

## Palette

| Token | Hex |
| ----- | --- |
| Near-black | `#030a12` |
| Deep blue | `#071b30` |
| Blue | `#125d8c` |
| Pale | `#c9efff` |
| White | `#f4fbff` |

## Stack (canonical)

Active panel ≈ `300×150`, angular slab clip (no rounded card).

| Role | translateY | scale | opacity |
| ---- | ---------- | ----- | ------- |
| current | `0` | `1` | `1` |
| next | `125px` | `.88` | `.65` |
| future | `205px` | `.76` | `.3` |

Demo floors: `041` CLEARED → `042` CLEARED → `043` UNKNOWN→DISCOVERED → `044` CLEARED.

## Ascend timing

| Phase | ms | Motion |
| ----- | -- | ------ |
| Anticipate | 0–120 | current `0→-8px`, scale `1→1.02`; blue line appears |
| Travel | 120–480 | current `-8→-190px` / `1.02→1.12`; next `125→0` / `.88→1`; future `205→125` / `.76→.88` |
| Lock | 430–600 | new current overshoot `0→-4→0`; side brackets snap; label locks |
| Discovery | +180 | on floor 043 only — dark glass retracts → `DISCOVERED` |

After each transition, rebuild the three roles at canonical transforms (no cumulative drift).

## Descend

Complementary sink / enter-from-above. Do **not** use `animation-direction: reverse`.

## API

```js
ascendTartarusFloor()
descendTartarusFloor()
resetTartarusFloor()
testRepeatedAscension(3)
```

Harness `{ type: 'restart' }` resets.

## Reduced motion

Immediate stack rebuild at the new index — no vertical travel.

## Accessibility

- Live region announces e.g. `Floor 42, discovered.`
- Visual stack is `aria-hidden`; controls remain the operable surface

## Porting

1. Copy `demo.css` / `demo.js` verbatim
2. Keep overflow clipped on the host
3. Honour both reduced-motion triggers
