# Hold-to-Charge Button (portable recreation spec)

Press-and-hold confirmation: an irregular red graphic mass progressively consumes a
clipped black button. Confirmation fires only after exactly **1400ms** of continuous hold.
Rebuild from this document, `demo.css`, `demo.js`, and `contract.json`.
No copyrighted Persona assets. Visual specimen only — nothing is deleted.

## Visual intent

- Aggressive irregular silhouette (Persona 5–inspired graphic shapes, original geometry)
- Black (`#090909`) button, paper (`#f5f1e8`) label, red (`#e60012`) charge mass
- Fill is a jagged polygon translated by `--hold-p` — not a rectangular progress bar
- Leading edge has five visible peaks/notches
- Labels: HOLD TO DELETE → KEEP HOLDING → ALMOST THERE → CONFIRMED!
- Tiny `CONFIRM` microtype inside the red region; angular accents at ~25/50/75%
- Early release retreats the mass leftward (≤260ms) and never confirms

## DOM structure

```html
<div class="hold-charge-demo" data-hold-charge-demo>
  <p data-hold-charge-status aria-live="polite">Ready</p>
  <button type="button" class="hold-charge" data-hold-charge>
    <span class="hold-charge__shock" aria-hidden="true"></span>
    <span class="hold-charge__fill" aria-hidden="true">…</span>
    <span class="hold-charge__accents" aria-hidden="true">…</span>
    <span class="hold-charge__label" data-hold-charge-label>HOLD TO DELETE</span>
  </button>
  <button type="button" data-hold-charge-reset>Reset</button>
</div>
```

## Button geometry

| Token | Value |
| ----- | ----- |
| Width | `min(88%, 320px)` |
| Height | `64px` |
| Radius | `0` |
| Clip-path | `polygon(0% 8%, 4% 0%, 96% 0%, 100% 10%, 100% 88%, 97% 100%, 6% 100%, 0% 90%)` |

## Fill geometry

Oversized red polygon (`118% × 140%`) with jagged right edge. Progress via CSS variable:

```css
transform: translate3d(calc(-100% + (var(--hold-p) * 100%)), 0, 0);
```

`--hold-p` ranges `0` → `1`, driven by elapsed hold time (not CSS animationend).

## Timing

| Phase | Window | Notes |
| ----- | ------ | ----- |
| Compress | 0–100ms | scale `.97`; label KEEP HOLDING |
| Charge | 100–1250ms | red mass expands left→right |
| Near | ≥85% (~1190ms) | label ALMOST THERE; ~2px misregister |
| Confirm | 1400ms | full cover; pulse `1→1.05→1` (180ms); shockwave +8px; CONFIRMED! |
| Cancel | release before 1400ms | retreat ≤260ms; HOLD TO DELETE |

## Pointer / keyboard

- `pointerdown` starts; `pointerup` / `pointercancel` / lost capture cancel
- Space keydown starts (ignore `repeat`); keyup cancels
- Blur cancels; Reset / `{ type: 'restart' }` restore idle

## API

```js
resetHoldCharge()
```

Logical confirmation uses `performance.now()` elapsed ≥ 1400ms — visual `--hold-p` stays in sync.

## Reduced motion

Under `prefers-reduced-motion: reduce` **or** `data-force-reduced-motion="true"`:

- Stepped fills at 0 / 25 / 50 / 75 / 100 (`data-rm-step`)
- Labels `HOLDING 25%` etc. — no continuous jagged sweep
- Hold threshold and confirmation remain functional

## Accessibility

- Real `<button>`; `aria-live` status for Ready / Holding / Cancelled / Confirmed
- Progress not colour-only (label + fill geometry / stepped text)
- Decorative fill, accents, shock: `aria-hidden`
- No real destructive action in the specimen

## Porting

1. Copy `demo.css` / `demo.js` verbatim
2. Drive `--hold-p` from elapsed hold time
3. Honour both reduced-motion triggers with stepped semantics
