# Manga Radial Speed Burst

## Visual intent

A reusable manga radial-speed-line emphasis burst around a central host object. Thirty-six predetermined tapered black speed lines rush inward from outside the plate toward an invisible circular dead zone, then clear completely — identical on every replay.

## Structure

- `position:relative; overflow:hidden` stage
- Effect layer (`.mrsb__fx`) mounts **behind** the focal result card
- Focal subject is an original result card / button (host styles unchanged by the effect)
- Beams are plain HTML spans with deterministic `--a` / `--w` custom properties (no `Math.random`)

## Geometry

| Token | Value |
| --- | --- |
| Line count | 36 (every 10°) |
| Protected inner radius | 72px |
| Conceptual outer radius | 420px |
| Beam length | 348px (420 − 72) |
| Thicknesses | Predetermined set between 2px and 7px |
| Ink | `#111111` |
| Effect background | transparent |

Beams taper via `clip-path` (wider at the outer tip, thinner at the protected rim) and never enter the 72px dead zone.

## Motion (420ms)

1. Beams `scaleY(0→1)` from the outer tip; opacity peaks near **110ms**
2. Focal card scales **1 → 1.055** for ~**80ms**, then returns to 1
3. Beams fade to opacity 0 by **420ms** and the burst clears

## Reduced motion

`prefers-reduced-motion` / `data-force-reduced-motion`: hide the animated layer; show a static set of **12** restrained rays plus a heavy focus border. No line movement.

## Portability

Plain HTML + CSS + tiny JS. Mount behind any relative-positioned subject without editing that subject’s styles.
