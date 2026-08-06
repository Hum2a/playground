# Power State Transformation (portable recreation spec)

Abstract engine upgrade: the same component identity accumulates pressure,
compresses, structurally transforms from Base to Ascended geometry during a
brief high-contrast burst, then updates capability metrics. Original CSS
geometry only — no characters, hair, franchise symbols, images, audio, or
network.

## Visual intent

BASE engine → pressure marks → compression → structural swap + rays → ASCENDED
metrics → static settle. Same identity throughout; capability and boundary
change. No looping aura.

## DOM structure

```html
<div class="pst" data-power-state data-phase="idle" data-form="base">
  <div class="pst__host">
    <p>ENGINE // 04</p>
    <div class="pst__stage">
      <div class="pst__field"></div>
      <div class="pst__marks"><!-- 10 --></div>
      <div class="pst__rays"><!-- 8 --></div>
      <div class="pst__engine">
        <div class="pst__geom--base">core · 2 laterals · foot</div>
        <div class="pst__geom--ascended">taller core · 6 spikes · foot</div>
      </div>
    </div>
    <dl class="pst__metrics">STATE / THROUGHPUT / CHANNELS</dl>
  </div>
  <button data-pst-trigger>TRANSFORM</button>
  <button data-pst-replay>REPLAY</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Id | `ENGINE // 04` |
| State | `BASE` → `ASCENDED` |
| Throughput | `1.0×` → `3.0×` |
| Channels | `2` → `6` |
| Trigger | `TRANSFORM` |
| Replay | `REPLAY` |

## Colours

| Token | Hex |
| ----- | --- |
| Ink | `#171b20` |
| Cream | `#f2eddb` |
| Gold | `#e5b33e` |
| Pale | `#f2d968` |
| Ember | `#d86349` |

## Geometry

### Base (~90 × 110)

- Central vertical core
- Two lateral structures
- Flat lower foot

### Ascended (~86 × 136, ~+24% height)

- Related taller core with narrower waist
- Six outward angular spikes
- Stronger vertical emphasis
- Structural visibility swap during burst — **no crossfade** between illustrations

## Phase 1 — pressure (~420ms)

- Exactly **10** energy marks move inward (frozen ring offsets)
- Component horizontal shift max **2px**, deterministic keyframes
- No continuous random shake

## Phase 2 — compression

- `scale(0.94, 1.04)` over **100ms**
- Marks collapse to centre
- Hold **70ms**

## Phase 3 — transformation burst (~180ms)

- Geometry switches Base → Ascended
- Exactly **8** long angular rays
- Boundary field: **110% → 165% → 118%**

## Metrics (clipped)

After geometry change:

| Metric | Timing |
| ------ | ------ |
| STATE | at burst start |
| THROUGHPUT | +60ms |
| CHANNELS | +120ms |

Clipped `translateY` — not opacity fade.

## Settling

- Ascended scale **1.06 → 1** over ~150ms
- Boundary becomes a static thin angular outline
- No looping aura

## Frozen motion (~920ms)

| Moment | Timing |
| ------ | ------ |
| Pressure | 0–420ms |
| Compress | 420–520ms |
| Hold | 520–590ms |
| Burst + geom swap | 590–770ms |
| Metrics | 590 / 650 / 710ms |
| Settle | 770–920ms |

## API

- `runPowerStateTransform()`
- `resetPowerStateTransform()`
- `replayPowerStateTransform()`

## Reduced motion

Immediately show Ascended geometry and final metrics.

## Accessibility

State and metrics are normal readable text. Motion (marks, rays, field) is
decorative. Polite status announces initial and final state only.
