# Cross-Out Status Swap (portable recreation spec)

Discrete status transition: an existing status is visibly invalidated before a
replacement status takes ownership of the same UI region.

Unlike Cross-Out Replacement (arbitrary values), this specimen is about
authoritative application states — e.g. PENDING → APPROVED.

Persona-adjacent paper/strike language. No copyrighted assets, fonts, or artwork.
No green “success” colouring.

## Visual intent

- Neutral process card: EXPORT REQUEST / REQ // 042
- PENDING on an irregular paper strip (~150×48, −1deg)
- Red then black opposing strikes mark it obsolete
- PENDING physically exits upper-left
- APPROVED attacks from lower-right (black face + red misregistered backing)
- Tiny CURRENT label snaps to confirm authority
- Total ~650ms; nothing loops

## DOM structure

```html
<div class="coss" data-cross-out-status data-state="idle">
  <div class="coss__card">
    <p class="coss__title">EXPORT REQUEST</p>
    <p class="coss__meta">REQ // 042</p>
    <div class="coss__stage">
      <div class="coss__old" data-coss-old>
        <span class="coss__strip coss__strip--pending">PENDING</span>
        <span class="coss__slash coss__slash--red" aria-hidden="true"></span>
        <span class="coss__slash coss__slash--ink" aria-hidden="true"></span>
      </div>
      <div class="coss__new" data-coss-new aria-hidden="true">
        <span class="coss__backing" aria-hidden="true"></span>
        <span class="coss__strip coss__strip--approved">APPROVED</span>
        <span class="coss__current" aria-hidden="true">CURRENT</span>
      </div>
    </div>
    <button type="button" data-coss-advance>ADVANCE STATUS</button>
    <button type="button" data-coss-reset>RESET</button>
  </div>
  <div role="status" aria-live="polite" data-coss-live></div>
</div>
```

## Colours

| Token | Value |
| ----- | ----- |
| Black | `#090909` |
| Paper | `#f5f1e8` |
| Red | `#e60012` |

## Choreography (~650ms)

| Phase | Window | Behaviour |
| ----- | ------ | --------- |
| Red slash | 0–160ms | Diagonal bar LL→UR, −7deg, width 118%, height 11px |
| Black strike | 120–260ms | Thinner opposing stroke, +4deg |
| Reject | 220–390ms | PENDING −1deg→5deg, translate −22px −12px, scale →.9, clip exit UL |
| Attack | 300–540ms | APPROVED from `38px 32px` / 8deg / 1.16 → impact −3px −1px / −3deg / .96 → settle −1deg |
| CURRENT | ~500–620ms | Tiny paper label snaps (~120ms) |

## Reduced motion

Immediate PENDING → APPROVED. Final geometry remains. No strikes/travel/overshoot.

## Accessibility

One semantic status at a time (`aria-hidden` swap). Announce:
`Export request status: approved.`

## Porting

1. Copy HTML + CSS + JS (or generate from `contract.json`).
2. Call `advanceCrossOutStatus()` / `resetCrossOutStatus()`.
3. Keep frozen slash geometry, APPROVED backing offset `7px 6px`, and 650ms timing.
4. Honour both reduced-motion triggers.
5. No React, Tailwind, host tokens, external fonts, or network.
