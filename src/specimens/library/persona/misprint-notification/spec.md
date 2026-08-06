# Misprint Notification (portable recreation spec)

Notification whose visual entrance is deliberately misregistered print layers
snapping into alignment. Inspired by Persona 5’s rough print aesthetic without
copying game assets. Rebuild from this document, `demo.css`, `demo.js`, and
`contract.json`.

## Visual intent

- Four layers: black backing, red offset, cyan offset, paper/message
- Start broken / misregistered; converge with one overshoot; lock still
- **Nothing loops after settle** — the effect is becoming correctly registered
- Dismiss separates layers toward different directions (~260ms), then clips out
- No opacity-only dismissal

## DOM structure

```html
<div class="misprint-demo">
  <button data-misprint-send>SEND NOTIFICATION</button>
  <div class="misprint" data-misprint hidden>
    <div class="misprint__stack" aria-hidden="true">
      <div class="misprint__layer misprint__layer--black"></div>
      <div class="misprint__layer misprint__layer--red"></div>
      <div class="misprint__layer misprint__layer--cyan"></div>
    </div>
    <div class="misprint__layer misprint__layer--paper" role="status" aria-live="polite">
      <span class="misprint__mark misprint__mark--tl" aria-hidden="true"></span>
      <span class="misprint__mark misprint__mark--br" aria-hidden="true"></span>
      <p class="misprint__eyebrow">NEW MESSAGE</p>
      <p class="misprint__body">Your export is ready.</p>
      <p class="misprint__meta">14:32</p>
    </div>
    <button data-misprint-dismiss>Dismiss</button>
  </div>
</div>
```

Host: relative overflow-hidden frame. Width of notification: `min(86%, 360px)`.
No rounded corners. Irregular `clip-path` polygon. Container final rotation ≈ `-1deg`.

## Colours

| Token | Hex |
| ----- | --- |
| Black | `#090909` |
| Paper | `#f2eee3` |
| Red | `#d71920` |
| Cyan | `#19b7c6` |

## Frozen initial misregistration

| Layer | Transform |
| ----- | --------- |
| Red | `translate(-18px, 8px) rotate(-3deg)` |
| Cyan | `translate(15px, -6px) rotate(2deg)` |
| Black | `translate(-8px, -10px) rotate(-1deg)` |
| Paper | `translate(10px, 14px) rotate(4deg)` |

## Alignment sequence (460ms)

| Phase | Window | Notes |
| ----- | ------ | ----- |
| Approach + overshoot | 0–180ms | Red crosses final by ~`4px`; cyan by ~`-3px` |
| Recoil | 180–320ms | Layers pull back |
| Lock | 320–460ms | Final registration |

Final decorative offsets: black `5px 6px`, red `2px 0`, cyan `-1px 1px`.
Paper readable at origin. Registration marks may spin ≈15deg during alignment.

## API

```js
export function showMisprint() { /* … */ }
export function dismissMisprint() { /* … */ }
export function replayMisprint() { /* … */ }
```

Busy-guarded. Replay does not accumulate DOM. Settled state never loops.

## Reduced motion

Both `prefers-reduced-motion` and `data-force-reduced-motion="true"`:
immediately show final registered notification; dismiss instantly.

## Accessibility

- Exactly one semantic notification (`role="status"`, `aria-live="polite"`)
- Decorative colour layers + marks are `aria-hidden`
- Do not announce four copies of the same text

## Porting checklist

1. Copy markup, CSS, and `showMisprint` / `dismissMisprint`
2. Mount in a clipped relative frame; wire SEND / Dismiss
3. Verify overshoot once, stillness after settle, layer-separating dismiss
4. Verify both reduced-motion triggers and 320–768px framing
