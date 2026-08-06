# Concentrated Energy Charge

**Ref:** SPX-968 · **Catalogue:** DB-003 (Kamehameha Charge)

## Intent

Multiple independent inputs converge into one compact execution node. The result is not “100% complete” — it means **ACTION ARMED**.

Semantic sequence: multiple inputs → concentration → stabilisation → armed action.

## Copy

| Role | Value |
| --- | --- |
| Operation | `DEPLOY // PRODUCTION` |
| Sources | `BUILD` `TEST` `PACKAGE` `SIGN` |
| Initial status | `UNARMED` |
| Final status | `ARMED` |
| Trigger | `CHARGE` → `RELEASE` (no auto-release) |

## Layout (frozen)

ViewBox `400×300`. Central node at **58% / 50%** (slightly right of centre).

| Source | Position |
| --- | --- |
| BUILD | top-left |
| TEST | bottom-left |
| PACKAGE | top-right |
| SIGN | bottom-right |

## Paths (frozen `d`)

1. BUILD `M 48 40 C 100 88, 168 132, 232 150`
2. TEST `M 48 260 C 100 212, 168 168, 232 150`
3. PACKAGE `M 352 40 C 300 88, 268 132, 232 150`
4. SIGN `M 352 260 C 300 212, 268 168, 232 150`

## Timing

| Event | Value |
| --- | --- |
| BUILD start | 0ms |
| TEST start | 80ms |
| PACKAGE start | 160ms |
| SIGN start | 240ms |
| Packets / source | 3 |
| Packet spacing | 55ms |
| Packet travel | 300ms |
| Node size | 26px → 72px (deterministic +3.833…px / arrival) |
| Stabilise | 220ms (`1 → 1.08 → .96 → 1.03 → 1`) |

## Reduced motion

Immediate 72px node, subdued provenance paths, `ARMED`, button `RELEASE`.

## API

- `runConcentratedCharge()`
- `resetConcentratedCharge()`
