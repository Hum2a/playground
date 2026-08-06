# Link Trade Transfer (portable recreation spec)

Two endpoints exchange ownership through a shared link channel.
Rebuild from this document and `contract.json`.

Do **not** reproduce Pokémon art, logos, sprites, fonts, or franchise branding.

## Visual intent

| Endpoint | Initial | Final |
| -------- | ------- | ----- |
| `NODE // A` | VECTOR | PRISM |
| `NODE // B` | PRISM | VECTOR |

Trigger: `TRADE` · Complete label: `TRADE COMPLETE`

## Layout (frozen)

| Token | Value |
| ----- | ----- |
| Card | `150 × 170px` |
| Gap | `120px` |
| VECTOR path | central axis **−10px** (left → right) |
| PRISM path | central axis **+10px** (right → left) |

## Entities

- **VECTOR** — angular arrow `clip-path` polygon
- **PRISM** — faceted diamond `clip-path` polygon

## Phases

| Phase | Duration | Action |
| ----- | -------- | ------ |
| Link join | `160ms` | Broken segments → continuous line |
| Shrink | `120ms` | Entities `1 → 0.72`; leave cards |
| To midpoint | `260ms` | Travel toward centre on offset paths |
| Cross | flash | Small central diamond once |
| To opposite | `260ms` | Continue; scale `0.72 → 1.06 → 1` |
| Ownership | after arrival | Clipped label swap; glyphs reassigned |
| Teardown | `180ms` | Line returns to segmented idle |

## Accessibility

Announce only idle and final ownership, e.g.
`Node A owns PRISM. Node B owns VECTOR. Trade complete.`

## Reduced motion

Immediate ownership swap + `TRADE COMPLETE`.

## API

- `window.linkTradeTransfer.trade(root)`
- `window.linkTradeTransfer.reset(root)`
- `window.linkTradeTransfer.init(scope?)`
