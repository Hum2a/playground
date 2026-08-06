# Scanner Search (portable recreation spec)

Search-results interaction: submitting a query sends a tactical blue scanline
through a fixed local dataset. Rows classify only as the scanner reaches them.
Rebuild from this document, `demo.css`, `demo.js`, and `contract.json`.

## Visual intent

- Scanner visually performs the filter — not an instant list swap
- Matches: +4px shift, bright left rule, corner brackets, `MATCH`
- Non-matches: opacity → 0.32, −2px shift, then collapse after scan
- Result count appears last; zero matches → `NO MATCH` + broken blue line
- No network; case-insensitive substring match

## Dataset

1. Waterline Transition  
2. Glass Fracture  
3. Moon Phase Progress  
4. Glass Shard Transition  
5. Butterfly Entry  
6. Tactical Target Lock  

Default query: `glass` → **2 MATCHES**.

## Colours

| Token | Hex |
| ----- | --- |
| Near-black | `#020b15` |
| Deep blue | `#071f38` |
| Blue | `#116b9a` |
| Bright | `#42b9df` |
| Pale | `#d7f6ff` |
| Muted | `#667987` |

## Timing

| Phase | Duration |
| ----- | -------- |
| Scanline travel (2px × 108%, left −4%) | 650ms |
| Hold after final row | 80ms |
| Non-match collapse | 180ms |
| Row classify | when line reaches that row’s centre |

## API

```js
export function runScannerSearch(query?) { /* lock query, scan, filter */ }
export function runScannerClear() { /* restore full dataset */ }
```

Do not search on every keystroke.

## Reduced motion

Both repository triggers: immediately show filtered state + count; no scanline.

## Accessibility

Real `<label>` / `<input>` / buttons. Visual summary + polite live region for
completion (`2 results for glass.`). Do not announce each row classification.

## Porting checklist

1. Copy markup, CSS, JS  
2. Keep the six-row static dataset and frozen timings  
3. Classify per-row as the scanline advances  
4. Honour dual reduced-motion triggers  
