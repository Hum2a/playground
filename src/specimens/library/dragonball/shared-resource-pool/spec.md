# Shared Resource Pool (portable recreation spec)

Collective drain: twenty fixed five-capacity units orbit a luminous central pool
mass. ALLOCATE peels units off the ring along three frozen contribution arcs into
BUILD, TEST, and SHIP nodes on the outer orbit. The core shrinks and dims as
capacity leaves; two units remain when the pool hits LOW.

## Visual intent

Circular spirit-bomb silhouette inverted — energy departs a central golden
sphere along curved arcs to three outer receiver nodes. No dashboard chips or
percentage meters. Dashed orbit ring, halo mass, and arc strokes carry the read.

## DOM structure

```html
<div class="srp" data-shared-resource data-phase="idle">
  <p class="srp__system">COLLECTIVE // POOL</p>
  <div class="srp__arena">
    <div class="srp__core">…halo + mass…</div>
    <div class="srp__units">…20 orbit units…</div>
    <svg class="srp__arcs">…3 frozen arcs…</svg>
    <div class="srp__consumer srp__consumer--build">BUILD</div>
    …test / ship…
  </div>
  <dl class="srp__ledger">POOL · RESERVE · STATE</dl>
  <button data-srp-allocate>ALLOCATE</button>
</div>
```

## Frozen numbers

| Consumer | Units | Capacity |
| -------- | ----- | -------- |
| BUILD | 8 | 40 |
| TEST | 7 | 35 |
| SHIP | 3 | 15 |
| Remaining | 2 | 10 |

Pool commits: `100 → 60 → 25 → 10`. Consumer metrics commit only after each
group's final unit docks (+240ms settle).

## Timing (deterministic)

| Group | Start | Stagger |
| ----- | ----- | ------- |
| BUILD | 0ms | 60ms per unit |
| TEST | 180ms | 60ms per unit |
| SHIP | 300ms | 60ms per unit |

## Thresholds

- At pool **25**: two fixed warning ticks appear on the arena
- At pool **10**: STATE becomes `LOW`; core glow reduces to `--srp-glow: 0.42`

## Colours

| Token | Hex |
| ----- | --- |
| Void | `#0a0e1c` |
| Gold | `#f5d76e` |
| Core | `#fff6c8` |
| Warn | `#d4723f` |
| Orbit | `#4a5f9a` |

## API

- `window.sharedResourcePool.allocate()` · `.reset()` · `.init()`

## Reduced motion

Immediately assigns all units to their consumers, shows BUILD 40 / TEST 35 /
SHIP 15, pool 10 LOW, with no arc or unit travel.

## Accessibility

Ledger values are plain text. Polite status announces pool and consumer totals.

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim; keep orbit geometry and arc paths.
2. Freeze 20 five-capacity units → BUILD 8 / TEST 7 / SHIP 3 (40/35/15), pool end 10 LOW.
3. Call `window.sharedResourcePool.allocate()` / `.reset()`; honour both reduced-motion triggers.
