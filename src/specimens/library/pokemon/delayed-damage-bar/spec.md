# Delayed Damage Bar

## Visual intent

Pokémon-inspired resource-loss feedback: the numeric value and primary bar move
to the new health immediately, while a warm trailing layer remains at the prior
level, then catches up after a pause. Communicates current state and magnitude
of recent change. Original palette and geometry — no game assets.

## DOM structure

```
.ddb[data-delayed-damage-bar]
  .ddb__panel
    #ddb-label                 SYSTEM HEALTH
    .ddb__readout
      [data-ddb-value]         164 / 200 → 96 / 200
      [data-ddb-delta]         -68
    [role=meter][data-ddb-track]
      .ddb__trail              warm pale lag layer
      .ddb__fill               current HP layer
    [data-ddb-hint]            Healthy | Low resource
  .ddb__actions                DAMAGE / RESET
  .ddb__status[role=status]
```

## Frozen dimensions

| Token | Value |
| --- | --- |
| Bar width | `280px` |
| Bar height | `18px` |
| Corner | hard / 1px radius |
| Start | `164 / 200` → **82%** |
| End | `96 / 200` → **48%** |
| Damage | `-68` |
| Low threshold | **50%** |

## Palette

| Role | Hex |
| --- | --- |
| Track | `#2c3036` |
| Trail | `#e6c27a` |
| Fill (healthy) | `#3d9e55` |
| Fill (low) | `#d9773a` |
| Damage text | `#c94a3a` |
| Panel | `#f4f1ea` |
| Ink | `#1a1c1e` |

## Timing (from DAMAGE)

| Phase | Window | Effect |
| --- | --- | --- |
| Impact | 0–100ms | Track `0 → 3px → -2px → 0` once |
| Numeric | 0–80ms | Current value `164 → 96` commits before the old-value trail moves |
| Primary | 0–180ms | Fill `82% → 48%`; colour flips when crossing 50% |
| Delta | 0–500ms | `-68` rises `6px` and fades out |
| Trail hold | 180–500ms | Trail alone stays at the prior **82%** after numeric/primary have reached their new state |
| Trail drain | 500–920ms | Trail `82% → 48%` over **420ms** |

## Reduced motion

Immediate fill + trail at 48%, value `96 / 200`, low hint. No delay/trail lag/impact.

## Accessibility

- Track uses `role="meter"` with `aria-valuemin/max/now` and `aria-valuetext` (`96 of 200`)
- Hint text pairs with colour (`Healthy` / `Low resource`)
- Status announces final value once

## Porting

Import `demo.css` verbatim. API: `runDelayedDamage` / `resetDelayedDamage` / `replayDelayedDamage`.
