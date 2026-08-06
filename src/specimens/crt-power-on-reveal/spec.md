# CRT Power-On Reveal (portable recreation spec)

Classic CRT warm-up: horizontal line, vertical expand, bloom flash, UI resolve.

## Sequence

1. Off — black screen
2. Line — bright horizontal beam (180ms)
3. Expand — beam scales vertically (320ms)
4. Bloom — radial flash (280ms)
5. Resolve — SIGNAL READY UI fades in (360ms)

## Reduced motion

Final UI visible immediately without beam or bloom when `prefers-reduced-motion: reduce` or `data-force-reduced-motion="true"`.

## Palette

`#F5C400` / `#101010` / `#F7F3E8` / `#E8E8E8`
