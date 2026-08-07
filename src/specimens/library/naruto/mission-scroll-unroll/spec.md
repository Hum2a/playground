# Mission Scroll Unroll

A rolled parchment scroll between two caps expands by **physical height** (16px → 190px over 480ms), then reveals four briefing lines by unclipping (not a primary opacity fade).

## Behaviour

- Idle: body height 16px, status `ROLLED`, lines clipped.
- Unrolling: height grows to 190px over 480ms; lines start unclipping at 280ms with a 70ms stagger.
- Resolved: all four lines visible, status `BRIEFED`.
- Reduced motion: scroll appears fully open at 190px with all lines visible immediately.

## Freeze

- Heights: rolled 16px · open 190px
- Unroll: 480ms · line start: 280ms · stagger: 70ms × 4 · settle: 90ms
- Lines: `RANK B` · `Retrieve the Sealed Scroll` · rule · `Escort · Recon · No engagement`
- Palette: `#1A1612` / `#EBE2D0` / `#B83228` / `#6A5E4E` / `#F7F2E8`
