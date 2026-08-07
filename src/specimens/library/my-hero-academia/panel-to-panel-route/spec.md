# Panel-to-Panel Route (portable recreation spec)

Selected comic panel grows to fill the stage and reveals the next content
state (MISSION COMPLETE). Rebuild from this document and `contract.json`.

**Ref:** SPX-2211 · **Catalogue:** MHA-237

## Interaction

- Three panels: 01 ANALYSIS, 02 TARGET (default selected), 03 OUTPUT
- From→to label: `{panel} → MISSION COMPLETE`
- **Route** trigger expands selected panel (740ms) then shows route view
- aria-live announces panel selection and route completion
- Replay: click Route again to reset

## Timing (ms)

| Phase | ms |
| --- | --- |
| Expand | 740 |
| Settle | 650 |
| Total | 1390 |

## Reduced motion

Instant switch to MISSION COMPLETE route view with aria-live announcement.
