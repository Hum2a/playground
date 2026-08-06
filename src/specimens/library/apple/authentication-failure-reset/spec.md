# Authentication Failure Reset (portable recreation spec)

Abstract scan field rejects once on `FAIL`, shows `NOT VERIFIED`, then resets to `READY TO RETRY`.

## Contract

| Parameter | Value |
| --------- | ----- |
| Shake sequence | `0,-4,+4,-3,+2,0px` over `240ms` |
| Brackets | four rotate `8deg` and retract `5px` |
| Hold | `650ms` |
| Restore | `180ms` |
| Status path | `SCANNING → NOT VERIFIED → READY TO RETRY` |

## Reduced motion

Show NOT VERIFIED, dwell, then READY TO RETRY without shake.

## API

- `resetAuthenticationFailureReset()`
