# AirDrop Transfer Arc (portable recreation spec)

Send `REPORT.PDF // 4.2MB` from THIS DEVICE to DEVICE // B with acceptance
gate, four acquisition brackets, quadratic arc transfer, and RECEIVED state.

## Contract

| Parameter | Value |
| --------- | ----- |
| Separation | ~`280px` |
| Brackets | four on recipient, `100ms` |
| Acceptance delay | `260ms` before arc |
| Proxy | `74 × 44px` |
| Arc duration | `520ms` |
| Progress | 0, 25, 50, 75, 100 |
| Arrival | recipient boundary +4px, proxy compresses |

## Reduced motion

Show accepted then received without arc travel.

## API

- `resetAirdropTransferArc()`
