# Capacity Drain

**Ref:** SPX-1210 · Non-catalogue Dragon Ball–inspired (hostile extraction; not Capacity Donation)

## Intent

Receiver-initiated resource extraction with visible geometry: donor vessel depletes and dims while an extraction beam pulls capacity into the sink. Drain stops at source SAFE MIN.

## Scaffold

| Role | Copy |
| --- | --- |
| Source | `SERVICE // A` · capacity `90` |
| Receiver | `PROCESS // B` · capacity `10` |
| Safe min | `30` |
| Trigger | `START DRAIN` |
| Final | A `30` · B `70` · `DRAIN STOPPED` |
| Announce | `Process B drained 60 capacity from Service A. Drain stopped at source safe minimum of 30.` |

## Visual contract (frozen)

| Element | Spec |
| --- | --- |
| Donor vessel | 9-cell grid tank; fill height tracks capacity; SAFE MIN line at 33.33% |
| Sink vessel | 7-cell grid tank; fill height tracks capacity (max 70) |
| Donor dim | opacity/brightness scales as capacity drains toward SAFE MIN |
| Extraction beam | gradient sheath + pulsing core line A→B while draining |
| Brackets | 4 corner locks on donor during drain |
| Packets | 6 diamond pulses along beam |

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

## Reduced motion

Immediate final 30/70 vessels + DRAIN STOPPED. No beam or packet motion.
