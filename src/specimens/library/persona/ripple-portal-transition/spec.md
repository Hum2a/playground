# Ripple Portal Transition (portable recreation spec)

A small water-like disturbance expands from a fixed origin and progressively
reveals the destination inside its growing radius — a ripple becoming a portal
between interface states. Rebuild from this document, `demo.css`, `demo.js`, and
`contract.json`.

## Visual intent

- Destination **exists inside** the expanding circular clip (not a crossfade under rings)
- Fixed origin at **68% / 58%** — never randomised from click position
- At least three ripple rings; ring 3 tracks the reveal boundary
- Narrow refraction band (8–14px) with 2–4px geometric offset at the boundary
- Subtle depth: State A scales 1→1.015 outside; State B 0.985→1 inside
- No looping rings; afterglow ~150ms after full cover then stop

## DOM structure

```html
<div class="ripple-portal-demo" data-context="a">
  <div class="ripple-portal-demo__surface">RECORD // A / SURFACE / ENTER DEPTH</div>
  <div class="ripple-portal-demo__depth" aria-hidden="true">RECORD // B / DEPTH / RETURN</div>
  <div class="ripple-portal-demo__refract" aria-hidden="true">…offset duplicate…</div>
  <div class="ripple-portal" aria-hidden="true">
    point + ring--1 + ring--2 + ring--3
  </div>
</div>
```

## Colours

| Token | Hex |
| ----- | --- |
| Near-black | `#020b16` |
| Deep blue | `#062b4a` |
| Blue | `#0e6f9f` |
| Bright | `#42b9dc` |
| Pale | `#d2f5ff` |

## Geometry

| Token | Value |
| ----- | ----- |
| Origin | `68% 58%` |
| Cover radius | `150vmax` (exceeds host diagonal) |
| Refraction band | ~11px (within 8–14px) |
| Refraction offset | `translate(3px, -2px)` |

## Timing (enter ≈700ms)

| Phase | Window |
| ----- | ------ |
| Disturbance `4→10→6px` | 0–100ms |
| Ring 1 `12→180px`, ~2px border | 60–320ms |
| Ring 2 `10→240px` | starts 170ms (+110ms after ring 1) |
| Ring 3 (reveal-aligned, beyond diagonal) | starts 180ms |
| Circular reveal cover | ~520ms |
| Rings continue then fade | +150ms after cover |
| Total | ~700ms |

Easing: `cubic-bezier(0.4, 0, 0.2, 1)`.

## API

```js
export function runRippleEnter() { /* A → B */ }
export function runRippleReturn() { /* B → A; resets origin exactly */ }
```

## Reduced motion

Both repository triggers: immediately show State B; no ripple expansion.

## Accessibility

Ripple / refraction `aria-hidden`. Only the active context is semantic; focus moves
to ENTER DEPTH / RETURN accordingly.

## Porting checklist

1. Copy markup, CSS, JS
2. Keep State B mounted and clipped from the origin — do not late-swap content
3. Preserve frozen origin, radii, delays, and 700ms total
4. Honour dual reduced-motion triggers
