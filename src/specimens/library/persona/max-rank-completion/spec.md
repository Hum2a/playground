# Max Rank Completion

## Visual intent

Terminal Social Link completion. YOU and ALLY begin joined by a strong double-line bond at rank **09**. **MAX LINK** sends energy inward from both nodes; the centre reel rolls **09 → 10**; four luminous paths grow from the centre into a diamond circuit that reconnects both entities; a pale outline expands ~6px and settles; **MAX** appears beneath 10. Completely static when done — no particles, no looping glow.

## DOM structure

```
.mrc[data-max-rank][data-state]
  button[data-mrc-trigger]     MAX LINK
  .mrc__status[role=status]
  .mrc__host
    .mrc__stage[aria-hidden]
      .mrc__node--you / --ally
      .mrc__bond                 double-line + energy segments
      .mrc__rank                 reel 09|10 + MAX
      .mrc__circuit              four paths + caps
      .mrc__outline              pale diamond outline
```

## Copy

| Element | Text |
| --- | --- |
| Left node | `YOU` |
| Right node | `ALLY` |
| Initial rank | `09` |
| Final rank | `10` |
| Badge | `MAX` |
| Trigger | `MAX LINK` |

## Timing

| Phase | Window | Duration | Effect |
| --- | --- | --- | --- |
| Energy | 0–300ms | 300ms | Segments travel inward from both entities |
| Rank | 300–480ms | 180ms | Vertical reel 09 → 10 |
| Circuit | 480–900ms | 420ms | Four paths UL/UR/LR/LL grow; caps lock |
| Lock | 900–1060ms | 160ms | Outline expand ~6px settle; MAX appears |

Total ≈ **1.06s**. No bounce/spring. Nothing loops.

## States

| `data-state` | Role |
| --- | --- |
| `idle` | Rank 09, double bond only |
| `energy` | Inward energy travel |
| `rank` | Reel rolls to 10 |
| `circuit` | Diamond paths construct |
| `lock` | Outline + MAX |
| `complete` | Static completed circuit |

## Reduced motion

Immediate Rank 10 + full circuit + MAX + outline. No energy travel or path growth animation.

## Accessibility

| Phase | Status |
| --- | --- |
| Before | `Social link rank 09.` |
| After roll | `Social link rank 10.` |
| Complete | `Social link max rank. Rank 10.` |

Stage is `aria-hidden`. Visible focus on MAX LINK.

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim.
2. Keep frozen timings (300 / 180 / 420 / 160) and diamond path angles.
3. Call `completeMaxRank()` / `resetMaxRank()` (or harness restart).
4. Honour both reduced-motion triggers.
