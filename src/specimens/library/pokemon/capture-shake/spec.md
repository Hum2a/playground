# Capture Shake

## Visual intent

Uncertain capture confirmation. An abstract coral entity (`SPECIMEN // UNKNOWN`) drops into an original circular capture device (dark ring, light field, horizontal seam, central diamond — not a Poké Ball). After enclose and settle, exactly three discrete shakes with pauses resolve to **CAPTURED** with a diamond flash and three star polygons. Status swaps via vertical clipping (no fade).

## DOM structure

- Root `[data-capture-shake]`
- Stage: target, device (upper/lower halves, seam, diamond), three stars
- Status clip with UNRESOLVED / CAPTURED words
- CAPTURE / RESET controls

## Copy

| Role | Text |
| --- | --- |
| Target | `SPECIMEN // UNKNOWN` |
| Trigger | `CAPTURE` |
| Initial status | `UNRESOLVED` |
| Final status | `CAPTURED` |
| Reset | `RESET` |

## Layout and colour contract

Device Ø ~120px. Palette `#171c20` / `#f1efe2` / `#d95b4e` / `#f0b84a` / `#ffffff`. Target starts ~90px above centre. Enter 240ms (scale 1→0.55). Settle +10px / 140ms; wait 180ms. Shakes: (−11°/4°/0 @220 +180p), (10°/−4°/0 @220 +200p), (−8°/3°/0 @200 +220p). Stars scale 0.4→1 at 0/45/90ms stagger.

## Reduced motion

Immediate closed device, three static stars, CAPTURED text. No enter, shakes, or flash animation.

## Accessibility

Success is readable as **CAPTURED** text. Decorative device/stars are `aria-hidden`. Polite live region on status. Visible focus on controls.

## Porting to another stack

Import `demo.css` verbatim. Call `runCaptureShake` / `resetCaptureShake`. Freeze timings, rotations, and geometry from `contract.json`.
