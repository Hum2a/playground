# Sector Radar Search

Original sector-by-sector software search, conceptually inspired by Dragon Radar
search language without reproducing device graphics or colours.

## Frozen contract

- Field: `320 × 320px`, 8 radial divisions, 4 concentric bands
- Origin: centre diamond `8 × 8px`
- Candidates: A `32%,26%` / B `72%,34%` / C `28%,71%` / D `66%,67%`
- Strengths: A `.31`, B `.46`, C `.58`, D `.92`
- Sweep: exactly two linear `1200ms` rotations, never loops
- First pass discovery order: B / D / C / A at 100/300/550/850ms
- Target lock: D on pass two; 4 × 14px brackets; exactly 3 triangulation lines over 180ms

Final: `SIGNALS // 4`, `TARGET LOCKED`, `TARGET // NODE D`, `DISTANCE // 2.4`.

Reduced motion immediately renders all candidates and D lock. API:
`runSectorRadarSearch`, `resetSectorRadarSearch`, `replaySectorRadarSearch`.
