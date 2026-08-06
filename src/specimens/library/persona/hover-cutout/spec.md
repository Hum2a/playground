# Hover Cutout

## Visual intent

On hover/focus, an oversized irregular black graphic attacks behind a restrained text action. A paper-coloured irregular aperture punches through that mass so the label reads as negative-space cutout — not a simple colour invert. Persona 5–inspired extreme black/white composition; no game assets.

## DOM structure

```
.hco
  nav.hco__nav
    a.hco__item                  ×3 real links
      .hco__red[aria-hidden]     red shard (offset)
      .hco__mass[aria-hidden]    oversized black polygon
      .hco__cut[aria-hidden]     paper aperture / cutout
      .hco__label
```

## Copy

| Action | Label |
| --- | --- |
| 1 | `VIEW ARCHIVE` |
| 2 | `OPEN SPECIMEN` |
| 3 | `COPY PROMPT` |

## Palette

| Token | Value |
| --- | --- |
| Ink | `#090909` |
| Paper | `#f5f1e8` |
| Red | `#e60012` |

## Geometry (frozen)

| Layer | Size | Notes |
| --- | --- | --- |
| Mass | `135% × 170%` of item | Final rotate `-2deg` |
| Mass enter origin | `20% 50%` | From scaleX `.15` / scaleY `.45` / rotate `5deg` |
| Mass exit origin | `85% 45%` | Opposite-side collapse (~140ms) |
| Red shard | same footprint | Offset `8px 5px`, delay ~30ms |
| Cut aperture | `108% × 118%` | Paper irregular hole through black |

Default mass clip:

`polygon(1% 12%, 18% 0%, 97% 4%, 100% 78%, 88% 100%, 8% 96%, 0% 62%)`

Items 2–3 use distinct frozen silhouettes (not mirrors).

## Timing

| Beat | Duration |
| --- | --- |
| Enter | ~200ms (overshoot ~1.06 at ~70%) |
| Red lag | +30ms |
| Cut lag | +70ms |
| Exit | ~140ms toward opposite side |

## Reduced motion

Instant idle ↔ final cutout compositions. No scale travel.

## Accessibility

Real links; decorative layers `aria-hidden` + `pointer-events: none`. `:focus-visible` matches hover composition with a red outline.

## Porting

Import `demo.css` verbatim. CSS-only — no JS. Keep mass larger than the label so the effect cannot collapse into background inversion.
