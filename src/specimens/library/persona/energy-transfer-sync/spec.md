# Energy Transfer Sync (portable recreation spec)

Directional synchronisation: a READY source sends one blue energy packet along a
visible angular path to an OUTDATED target. On arrival the target updates and the
relationship settles to `SYNCED`. Copy/sync — source is not drained. No spinner.

## DOM structure

```html
<div class="ets" data-energy-transfer data-phase="idle">
  <div class="ets__row">
    <article class="ets__card--source">SOURCE · ARCHIVE · READY · v1.4</article>
    <div class="ets__link" aria-hidden="true">
      <!-- 3 segments + trails, mid marker, packet, SYNCED -->
    </div>
    <article class="ets__card--target">TARGET · PLAYGROUND · OUTDATED/READY · v1.3/v1.4</article>
  </div>
  <button data-ets-sync>SYNC</button>
  <button data-ets-reset>RESET</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Source | `SOURCE` / `ARCHIVE` / `READY` / `v1.4` |
| Target initial | `TARGET` / `PLAYGROUND` / `OUTDATED` / `v1.3` |
| Target final | `READY` / `v1.4` |
| Relationship | `SYNCED` |
| Trigger / reset | `SYNC` / `RESET` |

## Colours

| Token | Hex |
| ----- | --- |
| Near-black | `#020b15` |
| Deep blue | `#07223b` |
| Blue | `#126b99` |
| Bright | `#43bce2` |
| Pale | `#d8f7ff` |
| Muted | `#647987` |

## Connection

- Horizontal path width ~**180–260px** (`min(220px, 32vw)`; ~160px at ≤360px)
- Base line **2px**; final synced **3px**
- **3** connected angular segments (not a straight wire, not dotted)

## Packet

- One primary angular diamond/sliver **18×12px**
- Pale core + dark blue offset backing
- Path (wide): `M 0 6 L 72 -6 L 148 16 L 220 6`
- Path (narrow): `M 0 6 L 52 -4 L 108 14 L 160 6`
- Travel via `offset-path` / `offset-distance` / `offset-rotate: auto`

## Frozen motion

| Phase | Timing | Notes |
| ----- | ------ | ----- |
| Initiate | 0–140ms | Source `scale 1→.98→1`; trail fills first **25%** of seg-1 |
| Transfer | 140–620ms | Packet full path; trails grow seg-by-seg; mid pulse ~50%; OUTDATED `translateY -2px` near 80% |
| Arrival | ~620ms | Packet hits; target `scale 1→1.025→1` (~160ms); **3** arrival lines |
| State update | after arrival | OUTDATED↑ / READY↑ and v1.3↑ / v1.4↑ — vertical clip swap, no fade |
| Settle | ~980ms | Trail clears; link **3px** bright; `SYNCED` appears |

Source remains **READY** throughout.

## Reduced motion

Immediate: target READY v1.4, relationship SYNCED. No packet travel.

## Accessibility

- Path/packet decorative (`aria-hidden` on link)
- Expose statuses; optional `Synchronising.` during transfer
- Completion (once): `Playground synchronised to version 1.4.`
- Do not announce packet position

## Porting checklist

1. Copy markup + CSS (palette, segments, path strings, timings)
2. Swap target only after arrival
3. RESET restores OUTDATED v1.3 with no leftover packets
4. Verify ~320px compact horizontal layout
5. Honour both reduced-motion triggers
