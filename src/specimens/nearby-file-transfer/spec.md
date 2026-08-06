# Nearby File Transfer (portable recreation spec)

52×64px ARCHIVE.ZIP beside SOURCE sends along a curved path as a 34×42px
proxy over 650ms. Recipient absorbs proxy; determinate ring progresses 0→100%
over 1100ms. REJECT moves proxy 40px toward recipient then returns.

## Contract

| Parameter | Value |
| --------- | ----- |
| Separation | `240px` |
| Document | `52 × 64px` |
| Proxy | `34 × 42px` |
| Transfer | `650ms` curved path |
| Progress ring | `1100ms` 0→100% |
| Reject | `40px` toward recipient, then return |

## Reduced motion

Proxy jumps between source and recipient; progress remains determinate.

## API

- `resetNearbyFileTransfer()`
