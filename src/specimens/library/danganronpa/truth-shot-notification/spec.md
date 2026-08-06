# Truth shot notification (portable recreation spec)

Kinetic high-priority clue/fact notification inspired by Danganronpa’s “truth bullet”
visual language: a targeting streak, a fired projectile, impact rings, then a skewed
information card that snaps open. Rebuild from this document, `demo.css`, `demo.js`, and
`contract.json`. No logos, characters, game fonts, or extracted assets.

## Visual intent

- Information feels **fired** into the interface — not a soft toast fade
- Palette: hot pink `#f20f78`, black `#101010`, white `#f6f4ef`, acid yellow `#f4e600`
- Skewed polygon card; CSS circular “bullet” marker (no firearm imagery)
- Job: high-priority clue / evidence notification (one-shot, no auto-loop)

## DOM structure

Mount inside a host with `position: relative` and `overflow: hidden`.

```html
<div class="truth-shot" data-truth-shot>
  <div class="truth-shot__streak" aria-hidden="true"></div>
  <div class="truth-shot__projectile" aria-hidden="true">
    <span class="truth-shot__bullet"></span>
  </div>
  <div class="truth-shot__rings" aria-hidden="true">
    <span class="truth-shot__ring truth-shot__ring--1"></span>
    <span class="truth-shot__ring truth-shot__ring--2"></span>
  </div>
  <div class="truth-shot__card" role="alert" aria-live="assertive" aria-atomic="true">
    <p class="truth-shot__eyebrow">NEW EVIDENCE</p>
    <p class="truth-shot__body">Deployment log added</p>
    <p class="truth-shot__index" aria-hidden="true">TRUTH 04</p>
  </div>
</div>
<button type="button" data-truth-shot-dismiss>Dismiss</button>
<button type="button" data-truth-shot-replay>Replay</button>
```

## Copy

| Role | Text | Notes |
| --- | --- | --- |
| Eyebrow | `NEW EVIDENCE` | Part of alert announcement |
| Body | `Deployment log added` | Part of alert announcement |
| Index | `TRUTH 04` | Decorative — `aria-hidden` |

## Layout and colour contract

| Token / property | Value |
| --- | --- |
| Hot pink | `#f20f78` |
| Black | `#101010` |
| White | `#f6f4ef` |
| Acid yellow | `#f4e600` |
| Card width | `min(88%, 300px)` |
| Card clip-path | `polygon(0% 8%, 96% 0%, 100% 92%, 4% 100%)` |
| Card skew | `skewX(-6deg)` |
| Bullet size | `18px` circle |
| Projectile start | `translateX(-130%)` |

## Motion

Total entrance ≈ `580ms`.

| Phase | Duration | Behaviour |
| --- | --- | --- |
| Projectile + streak | `220ms` | Projectile from `translateX(-130%)` to impact; streak crosses |
| Impact rings | `80ms` | Two concentric rings scale `0.4` → `1.6` while fading |
| Card open | `280ms` | Narrow horizontal strip expands vertically, settles |

Exit (manual dismiss only) ≈ `320ms`: collapse horizontally, exit right (`translateX(140%)`). No fade-only dismiss. No auto-loop.

## Reduced motion

Under `prefers-reduced-motion: reduce` or `[data-force-reduced-motion="true"]`, show the
final notification card immediately. No streak, projectile, or rings.

## Accessibility

- Card uses `role="alert"` / `aria-live="assertive"` so urgency is announced once
- Streak, projectile, bullet, rings, and index microcopy are `aria-hidden`
- Do not rely on motion alone; Replay and Dismiss are real buttons

## Behaviour (tiny JS)

- Auto-fire on load
- Dismiss → collapse + exit right
- Replay / harness `{ type: 'restart' }` → dismiss (if needed) then fire again
- Reuse the same DOM node; never append duplicates

## Porting to another stack

1. Copy `demo.html` / `demo.css` / `demo.js` verbatim.
2. Mount in a relative + overflow-hidden frame.
3. Call `fireTruthShot` / `dismissTruthShot` / `replayTruthShot` from your triggers.
4. Honour both reduced-motion triggers with the static settled card.
