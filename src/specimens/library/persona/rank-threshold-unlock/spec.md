# Rank Threshold Unlock (SPX-2975)

Relationship progress fills from 72% past an 80% threshold to 100%, then flashes an unlock badge.

## Sequence

1. Fill — bar animates 72% → 100% (600ms)
2. Flash — UNLOCKED stamp keyframe flash (360ms)
3. Done — Assist Follow-Up tier visible

## Reduced motion

Bar and unlock appear at final values immediately.

## Palette

`#F5C400` / `#101010` / `#F7F3E8` / `#E8E8E8`
