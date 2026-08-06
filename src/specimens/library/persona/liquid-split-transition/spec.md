# Liquid Split Transition (portable recreation spec)

Container transition: a thin irregular liquid seam forms across the host, then
upper and lower surface regions pull apart in opposite directions to expose a
destination that already exists behind the opening. Graphic CSS water — not a
fluid simulation. No canvas, WebGL, SVG filters, network, or storage.

## Visual intent

Stable surface → liquid seam → opposing displacement → destination exposed →
old surface continues off-host. Not a conventional centre wipe; no crossfade.

## DOM structure

```html
<div class="ls" data-liquid-split data-phase="idle" data-surface="a">
  <div class="ls__host">
    <section class="ls__dest">DEPTH // 02 · SUBMERGED</section>
    <div class="ls__slab ls__slab--upper">…State A + 6 lobes + refract…</div>
    <div class="ls__slab ls__slab--lower">…State A + 6 lobes + refract…</div>
    <div class="ls__surface">DEPTH // 01 · SURFACE</div>
    <div class="ls__seam"><!-- 5 pale segments --></div>
  </div>
  <button data-ls-descend>DESCEND</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| State A | `DEPTH // 01` / `SURFACE` |
| State B | `DEPTH // 02` / `SUBMERGED` |
| Trigger | `DESCEND` |
| Status A | `Depth 01. Surface.` |
| Status B | `Depth 02. Submerged.` |

## Colours

| Token | Hex |
| ----- | --- |
| Near-black | `#020b16` |
| Deep | `#063253` |
| Mid | `#0c6891` |
| Bright | `#3cb4da` |
| Pale | `#cef4ff` |

## Seam

- Origin **54%** of host height
- **2px** pale irregular line built from **5** large CSS segments (not tiny waves)
- Width **0 → 110%** over **180ms**, centred

## Split

- Begins at **160ms**
- Upper: `translate(-8px, -58%)`
- Lower: `translate(8px, 58%)`
- Duration **~430ms**
- **6** frozen irregular blue lobes along each inner edge (no runtime randomness)
- Destination beneath scales **0.97 → 1** with the opening (no fade-in)
- **~24px** refraction bands with decorative duplicate offset **2.5px**

## Frozen motion (~760ms)

| Moment | Timing | Notes |
| ------ | ------ | ----- |
| Seam grow | 0–180ms | Width 0 → 110% |
| Split start | 160ms | Overlaps end of seam |
| Opposing travel | 160–590ms | Upper/lower leave; dest opens |
| Exit | 590–760ms | Slabs continue off-host; no reverse |
| Settle | 760ms | Destination static; no looping water |

## API

- `runLiquidSplit()` — seam → split → destination
- `resetLiquidSplit()` — return to Depth 01 / Surface
- `replayLiquidSplit()` — reset then descend

## Reduced motion

Immediately show destination (`Depth 02. Submerged.`). No seam travel or slab motion.

## Accessibility

Polite live status announces initial and final depth only. Seam, lobes, and
refraction are decorative (`aria-hidden`).
