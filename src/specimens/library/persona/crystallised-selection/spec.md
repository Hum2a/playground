# Crystallised selection (portable recreation spec)

Selection state where choosing an item causes five translucent blue geometric
regions to assemble around it, crystallising the choice into place.
Metaphor: candidate → selected → structurally locked.

Rebuild from this document, `demo.css`, `demo.js`, and `contract.json`.

## Visual intent

- Exactly five primary glass regions per option (own geometry — no teleport on switch)
- Regions start 20–45px off final pose at scale `.6–.8`, then converge
- Label shifts `translateX(5px)` and `scale(1.025)`
- At least two regions overlap in the locked composition
- Pale 2px diagonal sweep (90ms) then gone
- Final state completely static; no targeting reticle; no spring

## Timing

| Phase | Value |
| --- | --- |
| Total assemble | ≈260ms |
| Stagger | 0 / 25 / 45 / 70 / 95ms |
| Separate (outgoing) | ≈120ms |
| Sweep | 90ms at ≈200ms |
| Easing | `cubic-bezier(0.33, 0, 0.2, 1)` |

New selection begins before old fully exits (decisive handoff).

## Frozen polygons

See `contract.json` → `regions.polygons`.

## API

```js
export function selectCrystallised(choice) // 'motion' | 'structure' | 'depth'
```

Default: none selected.

## Reduced motion

Immediately render the final five-region locked composition. No travelling assemble or sweep.
