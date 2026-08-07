# Measurement Overload

Scouter-style analyser (`ANALYSER // MK-4`) designed for **0 — 9,999**. Incoming measurement climbs a frozen sequence, holds at maximum, briefly loses digits (`----`), then classifies overflow as **`> 9,999`** with a broken frame.

## Behaviour

1. Idle shows `0000` and supported range.
2. MEASURE steps: `0142` → … → `8431` (normal) → warning marks at `9270` → frame nudge at `9714` → vertical offset at `9938` → `9999` hold **180ms**.
3. Digits become `----` for **90ms**, then `> 9,999`.
4. Exactly **three** right-side fragments separate (**12–24px**); one diagonal fracture at **−18deg**; status **RANGE EXCEEDED**.
5. Final state stays static and readable.

## Fragment table (frozen)

| Fragment | Final transform |
| --- | --- |
| 1 | `translate(18px, -8px) rotate(8deg)` |
| 2 | `translate(24px, 2px) rotate(-4deg)` |
| 3 | `translate(12px, 10px) rotate(12deg)` |

Fracture: single diagonal at **−18deg**. Do not randomise offsets — values live in `contract.json` → `examples[0].overflow.fragmentOffsets`.

## Reduced motion

Immediate final broken-frame overflow.

## A11y

Announce: `Measurement exceeds supported range of 9,999.`
