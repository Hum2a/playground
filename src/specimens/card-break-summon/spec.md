# Card Break Summon (portable recreation spec)

A sealed rectangular archive token fractures into five large pieces and exposes
a newly available entity that already waits beneath. Generic geometry only —
do not reproduce Persona tarot artwork. Rebuild from this document, `demo.css`,
`demo.js`, and `contract.json`.

## Visual intent

- Card: **170 × 230px**, square corners
- Exactly **four** primary break lines → **five** large regions (centre + four sides)
- Shake precedes cracks; cracks precede separation
- Blue light leaks through cracks
- Entity is physically underneath (no late swap / no fade-in)
- Pieces travel **45–100px** outward then leave the host
- No particle explosion; final state static

## Copy

| State | Text |
| ----- | ---- |
| Sealed | `SEALED` / `ENTITY // ???` |
| Result | `ENTITY // 08` / `AVAILABLE` |
| Trigger | `SUMMON` |

## Timing

| Phase | Window |
| ----- | ------ |
| Shake `0 → -2deg → 2deg → 0` | 0–180ms |
| Cracks + blue leak | ~99–300ms |
| Five regions separate | from 300ms |
| Entity scale `.9 → 1.04 → 1` | with separation |
| Total | ~820ms |

## API

```js
export function runCardBreakSummon() { /* fracture → reveal */ }
export function runCardBreakReset() { /* restore sealed card */ }
```

## Reduced motion

Both repository triggers: immediately show the result entity.

## Porting checklist

1. Keep entity mounted under the card from the start  
2. Preserve five clip-path regions and four crack lines  
3. No tarot imagery; no particle debris  
4. Honour dual reduced-motion triggers  
