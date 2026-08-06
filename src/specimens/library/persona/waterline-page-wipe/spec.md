# Waterline Page Wipe (portable recreation spec)

Page/container transition: a stylised blue water mass rises from below, submerges
the current surface, fully covers for a hard content swap, then continues upward
to reveal the destination. Graphic CSS water — not fluid simulation. No canvas,
WebGL, or SVG filters.

## Visual intent

Depth and flow via a lobed waterline and continuous upward travel. Water never
reverses or falls.

## DOM structure

```html
<div class="wl" data-waterline-wipe data-phase="idle" data-surface="a">
  <div class="wl__host">
    <section data-wl-state="a">SURFACE // 01 · DAY</section>
    <section data-wl-state="b" hidden>SURFACE // 02 · NIGHT</section>
    <div class="wl__refract" aria-hidden="true">…</div>
    <div class="wl__water" aria-hidden="true">
      <div class="wl__mass">
        <!-- 6 lobes + body + pale highlight line -->
      </div>
    </div>
  </div>
  <button data-wl-trigger>SUBMERGE</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| State A | `SURFACE // 01` / `DAY` |
| State B | `SURFACE // 02` / `NIGHT` |
| Trigger | `SUBMERGE` |

## Colours

| Token | Hex |
| ----- | --- |
| Near-black | `#020b16` |
| Deep water | `#063257` |
| Mid blue | `#0b6392` |
| Bright | `#30a5ce` |
| Pale edge | `#bceeff` |

## Water mass

- One large overlay; initial waterline at **110%** of host height
- Top boundary: **6** large polygonal lobes (not high-frequency waves)
- Pale refractive highlight line **~3px** along the edge (`#bceeff`)
- Mass height **~145%** so full cover and upward exit are possible

## Frozen motion (~850ms)

| Moment | Timing | Notes |
| ------ | ------ | ----- |
| Rise | 0–520ms | Waterline `110% → -8%` |
| Lobe drift | during rise only | Relative `±3–7px` vertical; then stop |
| Full cover / swap | ~460ms | Hard A↔B swap — no crossfade |
| Continue | 520–850ms | Mass continues to `top: -145%` (exit upward) |
| Destination settle | ~180ms | State B `translateY(4px → 0)` |

## Refraction band

- Narrow **~26px** band tracking the waterline
- Decorative duplicate of active copy, offset **~2.5px** vertically
- Not a full-content blur

## Replay

`SUBMERGE` alternates A ↔ B deterministically. Harness `restart` resets to A then runs.

## Reduced motion

Immediate surface switch. No water travel, lobe drift, or refraction tracking.

## Accessibility

- Water / lobes / foam / refract: `aria-hidden`
- Only the active surface is semantic; announce via `aria-live`

## Porting checklist

1. Copy markup + CSS (palette, lobe clip-paths, keyframe tops)
2. Swap content only under full coverage
3. Keep continuous upward travel (no fall)
4. Verify narrow (~320) and wider hosts
5. Honour both reduced-motion triggers
