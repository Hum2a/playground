# Ki Charge Meter

**Ref:** SPX-966 · **Catalogue:** DB-001 (Ki Charge Meter)

## Visual intent

Warm parchment aggregation field — not a dark deploy card. Twenty-four fixed energy
units converge in four accelerating batches into a central charge vessel with
staging rings, growing a flat circular-diamond operation node. Final state is
stable `READY`; nothing loops.

Canonical copy: `BUILD // RELEASE`, `0%` → `100% READY`.

## DOM structure

```html
<div class="kcm" data-ki-charge-meter data-state="idle">
  <div class="kcm__head">…operation + percent…</div>
  <div class="kcm__field">
    <span class="kcm__corner">…four corners…</span>
    <div class="kcm__vessel"><span class="kcm__vessel-ring">…1–4…</span></div>
    <div class="kcm__node">…shell, core, diamond, four cardinal lines…</div>
  </div>
  <p class="kcm__progress-text">…</p>
  <button data-kcm-charge>CHARGE</button>
  <p role="status" data-kcm-status>…</p>
</div>
```

## Colours

| Token | Hex | Role |
| ----- | --- | ---- |
| Ink | `#1a2420` | Text, button fill |
| Paper | `#d4cfc0` | Field background |
| Vessel | `#3d5248` | Grid, corners, shell |
| Energy | `#c4782a` | Particles, diamond, lines |
| Glow | `#e8a84a` | Ready diamond, ring highlight |
| Ready | `#8b5e2a` | Percent at completion |

## Frozen particle contract

Exactly **24** energy units. Fixed field: `320 × 220px`. Six units per group:

| Group | Coordinates (x,y px) | Duration |
| --- | --- | --- |
| 1 | (12,18) (67,12) (140,25) (248,16) (294,57) (302,126) | 420ms |
| 2 | (22,181) (74,148) (119,205) (207,193) (274,170) (306,207) | 340ms |
| 3 | (9,98) (48,61) (103,115) (211,76) (259,103) (315,34) | 270ms |
| 4 | (30,31) (82,190) (151,9) (232,209) (280,91) (309,154) | 200ms |

Each six-unit group staggers by `30ms`. No `Math.random()`.

## Stage contract

| Completion | Percent | Node diameter | Vessel ring |
| --- | --- | --- | --- |
| Initial | 0 | 34px | — |
| Group 1 | 25 | 46px | ring 1 |
| Group 2 | 50 | 58px | rings 1–2 |
| Group 3 | 75 | 70px | rings 1–3 |
| Group 4 | 100 | 82px | rings 1–4 |

At 100%, the node compresses `1 → .92 → 1.05 → 1` over `160ms`; exactly four
cardinal lines appear. All particles are consumed.

## Reduced motion

Immediate 100%, full `82px` node, all four vessel rings, four cardinal lines,
and `READY` announcement. No particle travel.

## API

- `runKiChargeMeter()` / `resetKiChargeMeter()` / `replayKiChargeMeter()`
- `window.kiChargeMeter.charge()` / `.reset()` / `.replay`

## Accessibility

Progress text exposes discrete percent and status. Polite live region announces
`READY` once. CHARGE button has `:focus-visible` ring in energy amber.

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim; keep the frozen particle table.
2. Preserve vessel ring staging and cardinal convergence; do not randomise particle paths.
3. Call `runKiChargeMeter()` / `resetKiChargeMeter()` (or `window.kiChargeMeter`); honour both RM triggers.
