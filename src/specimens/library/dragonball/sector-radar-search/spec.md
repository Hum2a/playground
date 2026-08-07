# Sector Radar Search (portable recreation spec)

Instrument radar for `REGION // 12`: circular sector grid, conic sweep wedge,
four fixed blips, two finite passes, Node D target lock with brackets and
triangulation — not a list-style search UI.

## Visual intent

Dark phosphor instrument on a bezel-mounted circular field. Eight radial sectors,
four distance rings, centre origin diamond. A **42° conic sweep wedge** rotates
twice; blips pop when discovered; pass two rejects B/C/A; D (.92) locks with
four brackets and three triangulation lines.

## DOM structure

```html
<div class="srs" data-sector-radar data-phase="idle">
  <header>REGION // 12 · SIGNALS // N</header>
  <div class="srs__bezel">
    <div class="srs__field">
      …rings + axes + sweep wedge + blips + tri lines…
    </div>
  </div>
  <dl class="srs__readout">RESULT / TARGET / DIST</dl>
  <button data-srs-search>SEARCH</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| System | `REGION // 12` |
| Searching | `SEARCHING` |
| Locked | `TARGET LOCKED` |
| Target | `NODE D` |
| Distance | `2.4` |
| Trigger | `SEARCH` / `RESET` |

## Colours

| Token | Hex |
| ----- | --- |
| Background | `#0a1410` |
| Bezel | `#1a2a22` |
| Phosphor | `#3dff9a` |
| Phosphor dim | `#2ab87a` |
| Phosphor bright | `#7dffc4` |
| Ink | `#c8e8d4` |
| Warn | `#e8c84a` |
| Lock | `#f2f6f0` |

## Frozen geometry

| Element | Value |
| ------- | ----- |
| Field | `300px` diameter (circular) |
| Radial divisions | 8 |
| Distance bands | 4 |
| Origin diamond | `8 × 8px` |
| Sweep wedge | `42°` conic |
| Lock brackets | `14 × 14px` × 4 |
| Triangulation lines | 3 × `230px` over `180ms` |

## Candidates (fixed)

| ID | Position | Strength |
| -- | -------- | -------- |
| A | 32%, 26% | 0.31 |
| B | 72%, 34% | 0.46 |
| C | 28%, 71% | 0.58 |
| D | 66%, 67% | 0.92 |

## Frozen motion

| Phase | Timing | Notes |
| ----- | ------ | ----- |
| Sweep 1 | 0–1200ms | Wedge rotates; blips B/D/C/A @ 100/300/550/850ms |
| Sweep 2 | 1200–2400ms | Second rotation; reject B/C/A @ 1390/1640/1880ms |
| Lock | ~2040ms | D brackets + 3 tri lines; TARGET LOCKED |

Never loops after settle.

## API

- `runSectorRadarSearch()` / `resetSectorRadarSearch()` / `replaySectorRadarSearch()`

## Reduced motion

Immediate locked state: all blips visible, D locked, triangulation lines, final readout.

## Accessibility

Field `aria-hidden`. Polite live region announces final lock sentence only.
