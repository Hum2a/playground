# KEEP OUT Tape Marquee (portable recreation spec)

Diagonal yellow/black hazard tape with scrolling KEEP OUT · SIGNAL copy.

## DOM

Tape root `aria-hidden="true"` inside relative overflow-hidden host.

## Copy

```
KEEP OUT · SIGNAL · KEEP OUT ·
```

Two identical spans in track; `-50%` translateX loop (8s linear infinite).

## Reduced motion

Stop marquee; keep static tape when `prefers-reduced-motion: reduce` or `data-force-reduced-motion="true"`.

## Palette

`#F5C400` / `#101010`
