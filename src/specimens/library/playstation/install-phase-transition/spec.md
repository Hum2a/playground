# Install Phase Transition

Download ring morphs into segmented install bars on the same card — phase label and geometry both change.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3357` / `PS-051` |
| Download steps | `14` × `40ms` |
| Phase morph | `320ms` |
| Install steps | `14` × `40ms` |
| Labels | DOWNLOAD → INSTALL → READY |

## Behaviour

1. Download: circular ring fills to 100% on the card.
2. Morph: ring fades; four install bars appear; label → INSTALL.
3. Install: bars rise to 100%; done → READY / INSTALLED.
4. Reduced motion: jump to READY with bars full.

## Palette

- Blue: #2E90FF · Ink: #0B0F14 · Chalk: #F4F6F8 · Sky: #7EB6FF
