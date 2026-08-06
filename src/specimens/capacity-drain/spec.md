# Capacity Drain

**Ref:** SPX-1210 · Non-catalogue Dragon Ball–inspired (hostile extraction; not Capacity Donation)

## Intent

Receiver-initiated resource extraction. Source does not volunteer capacity. Drain stops at source SAFE MIN.

## Scaffold

| Role | Copy |
| --- | --- |
| Source | `SERVICE // A` · capacity `90` |
| Receiver | `PROCESS // B` · capacity `10` |
| Safe min | `30` |
| Trigger | `START DRAIN` |
| Final | A `30` · B `70` · `DRAIN STOPPED` |
| Announce | `Process B drained 60 capacity from Service A. Drain stopped at source safe minimum of 30.` |

## Geometry / timing (frozen)

| Token | Value |
| --- | --- |
| Gap | 230px |
| Connection B→A | 180ms |
| Extraction brackets | 4 |
| Packets | 6 × 10 capacity |
| Travel | 240ms |
| Spacing | 110ms |
| Disconnect segments | 5 → B over 140ms |
| Total capacity | 100 (conserved) |

## Metrics after arrival

`80/20 70/30 60/40 50/50 40/60 30/70`

## API

- `runCapacityDrain()`
- `resetCapacityDrain()`
