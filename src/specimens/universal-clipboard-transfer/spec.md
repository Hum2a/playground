# Universal Clipboard Transfer (portable recreation spec)

Copied text `BUILD-184` becomes a `96×34` token that hands off from `DESKTOP` to `TABLET` via a six-dot corridor.

## Contract

| Parameter | Value |
| --------- | ----- |
| Token | `96 × 34px` |
| Lift | `8px` |
| Absence gap | `70ms` |
| Corridor dots | `6` |
| Final status | `PASTED` |
| Caret | pre-exists at destination |

## Reduced motion

Immediate copied/pasted state.

## API

- `resetUniversalClipboardTransfer()`
