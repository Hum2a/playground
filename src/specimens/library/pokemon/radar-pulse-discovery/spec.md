# Radar Pulse Discovery

Spatial search / discovery primitive. A fixed origin emits three staggered concentric pulses through an abstract marker field. Hidden targets stay camouflaged until a pulse leading edge reaches their coordinates; **NODE // C** is the canonical discovered result.

## Freeze

| Item | Value |
| --- | --- |
| Field | `SECTOR // 07`, ~420×320 |
| Ordinary markers | exactly 24 (frozen %) |
| Origin | diamond 10×10 at 38% / 58% |
| Targets | A 18/24 · B 72/18 · C 64/61 · D 24/82 |
| Rings | 3 · starts 0 / 180 / 360ms · 16→420px · 900ms each |
| Reactions (ms from SCAN) | D 396 · C 453 · A 577 · B 819 |
| C lock | scale 2.2 · 4 bracket segments · `NODE // C` |
| Link | origin → C · 109.6px · ~5° · 180ms |
| Status | `NO SIGNAL` → `SIGNAL FOUND` (clip) |
| Text signal | `LEADING EDGE // D → C → A → B` |

## Behaviour

1. Idle: field + origin + `NO SIGNAL`.
2. SCAN: emit three border-only rings (no infinite radar loop).
3. The readable leading-edge line states the frozen distance order (D → C → A → B); targets react at that pulse edge.
4. C expands, brackets form, link grows, status becomes `SIGNAL FOUND`.
5. After ring 3 finishes (~1260ms), rings clear; origin–C connection and found marker remain.
6. SCAN again resets and replays.

## Reduced motion

Immediate found state: origin, C identified, link, `SIGNAL FOUND`. No expanding rings.

## Card boundary and compact readability

This is a bounded card primitive: its `420×320` field, chrome, and SCAN control
travel together. At narrow card widths, the chrome stacks without clipping and
the leading-edge text remains a readable non-motion signal.

## API

- `runRadarPulseScan()`
- `runRadarPulseReset()`
