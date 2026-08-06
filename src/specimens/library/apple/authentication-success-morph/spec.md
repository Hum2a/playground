# Authentication Success Morph (portable recreation spec)

Abstract scan field with four brackets and eight nodes morphs into verified geometry on `RESOLVE SUCCESS`.

## Contract

| Parameter | Value |
| --------- | ----- |
| Brackets inward | `6px` over `100ms` |
| Node convergence | `180ms` |
| Status | `VERIFYING → VERIFIED` |
| Settle | `scale(.98→1.02→1)` once |
| CONTINUE | locked until morph completes |

## Reduced motion

Immediate verified geometry.

## API

- `resetAuthenticationSuccessMorph()`
