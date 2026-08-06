# Contextual Vanish Reappear (portable recreation spec)

Contextual relocation: INSPECT vanishes from LEFT when FOCUS ERROR fires,
leaves two residual marks, stays absent (no travel), then reconstructs at
LINE 72 with two arrival marks and a short connector. No destination scan or
target lock — the context event chooses the destination.

## Visual intent

Left tool → error pulse → compress vanish → residue → gap → residue → reconstruct
→ connector to LINE 72. Responsive, not navigational Instant Transmission.

## DOM structure

```html
<div class="cvr" data-contextual-vanish data-phase="idle" data-anchor="left">
  <div class="cvr__stage">
    <article class="cvr__doc">DOCUMENT // 04 … ERROR // LINE 72</article>
    <div class="cvr__tool">INSPECT · ANCHOR LEFT</div>
    <div class="cvr__residues--depart"><!-- 2 --></div>
    <div class="cvr__residues--arrive"><!-- 2 --></div>
  </div>
  <button data-cvr-focus>FOCUS ERROR</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Document | `DOCUMENT // 04` |
| Tool | `INSPECT` |
| Error | `ERROR // LINE 72` |
| Meta | `ANCHOR LEFT` → `LINE 72` |
| Trigger | `FOCUS ERROR` |

## Colours

| Token | Hex |
| ----- | --- |
| Ink | `#10141a` |
| Cream | `#e6eaef` |
| Muted | `#6b7582` |
| Line | `#2a333e` |
| Blue | `#4a8fd4` |
| Pale | `#9ec4f0` |
| Warn | `#d4a017` |

## Frozen layout

| Element | Position |
| ------- | -------- |
| Tool (left) | `left: 10px; top: 40%` |
| Tool (line 72) | `right: 12px; top: 62%` |
| Error vertical | 62% of stage |
| Connector | 28px |

## Timing

| Phase | Duration | Notes |
| ----- | -------- | ----- |
| Error pulse | 90ms | scale 1 → 1.12 → 1 |
| Vanish | 70ms | scale .92 → .3 |
| Departure residues | 60ms | exactly 2 marks fade |
| Gap | 55ms | tool absent; no travel |
| Reappear | 110ms | .3 → 1.08 → 1 |
| Connector | 80ms | width 0 → 28px |

## Residues

- Departure: exactly **2** thin marks at left
- Arrival: exactly **2** matching marks at LINE 72

## API

- `runContextualVanish()`
- `resetContextualVanish()`
- `replayContextualVanish()`

## Reduced motion

Immediately place INSPECT at LINE 72 with connector and metadata.

## Accessibility

Polite status exposes current tool context (left / line 72). Residues decorative.
