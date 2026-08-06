# Dramatic Objection Error (portable recreation spec)

Ace Attorney–adjacent major validation interruption: a huge typographic `HOLD IT!`
burst slams across a form host when an important access-code failure occurs. Agents
in other projects can rebuild the effect from this document and `contract.json`.

Do **not** use the copyrighted “OBJECTION!” graphic, game logos, characters, audio,
or extracted assets. This specimen uses original `HOLD IT!` copy only.

## Visual intent

- Reserved for significant form/validation failures (not ordinary inline validation)
- Radial CSS impact burst, then overshooting shout typography, then error strip
- Offset black duplicate behind red/paper shout (rough print registration)
- After a readable hold, collapse to a normal inline field error
- Decorative overlay is `aria-hidden`; the real error is associated with the input

## DOM structure

```html
<div class="dramatic-objection" data-dramatic-objection>
  <form class="dramatic-objection__form" data-do-form novalidate>
    <label class="dramatic-objection__label" for="do-access-code">ACCESS CODE</label>
    <input class="dramatic-objection__input" id="do-access-code"
      aria-describedby="do-access-error" data-do-input />
    <p class="dramatic-objection__error" id="do-access-error" role="alert"
      data-do-error hidden></p>
    <button class="dramatic-objection__submit" type="submit">SUBMIT</button>
  </form>

  <div class="dramatic-objection__overlay" data-do-overlay aria-hidden="true">
    <div class="dramatic-objection__burst">…wedges…</div>
    <div class="dramatic-objection__shout">
      <span class="dramatic-objection__shout-ink">HOLD IT!</span>
      <span class="dramatic-objection__shout-face">HOLD IT!</span>
    </div>
    <p class="dramatic-objection__strip">That code isn't valid.</p>
  </div>
</div>
```

Parent frame should be `position: relative` and `overflow: hidden`.

## Copy

| Role | Value |
| ---- | ----- |
| Label | `ACCESS CODE` |
| Submit | `SUBMIT` |
| Shout | `HOLD IT!` |
| Strip / field error | `That code isn't valid.` |
| Valid demo code | `ARCHIVE` |

## Layout and colour contract

| Token / property | Value | Notes |
| ---------------- | ----- | ----- |
| Red | `#c91420` | Shout face |
| Paper | `#fff6df` | Strip fill / face stroke |
| Black | `#111111` | Shout ink offset, borders |
| Orange | `#f08a24` | Burst accents, focus, inline error |
| Shout ink offset | `5px 6px` | Misregistration |
| Burst | `0–80ms` | Radial polygon wedges |
| Shout | `80–300ms` | Scale `2.4 → 0.92 → 1`; rotate `-7deg → 2deg → -1deg` |
| Strip | `300–520ms` | Snaps underneath |
| Hold | `520–900ms` | Readable composition |
| Inline | `≥900ms` | Overlay hidden; field error remains |
| Shout easing | `cubic-bezier(0.18, 1.45, 0.32, 1)` | |
| Strip easing | `cubic-bezier(0.2, 0.9, 0.25, 1.15)` | |

## Phases (JS)

Toggle root classes — never append/remove burst nodes:

- `dramatic-objection--burst`
- `dramatic-objection--shout`
- `dramatic-objection--strip`
- `dramatic-objection--hold`
- `dramatic-objection--inline`

Call `runDramaticObjection()` on invalid submit. Listen for harness `{ type: 'restart' }` to reset.

## Reduced motion

Skip slam movement; show static `HOLD IT!` + strip briefly, then collapse to inline error when either:

- `@media (prefers-reduced-motion: reduce)`, or
- Document root has `data-force-reduced-motion="true"`

## Accessibility

- Overlay / burst / shout / strip: `aria-hidden="true"` (decorative)
- Real error: `#do-access-error` with `role="alert"`, wired via `aria-describedby`
- Invalid field: `aria-invalid="true"`
- Do not announce the giant typography separately

## Porting to another stack

1. Copy DOM + CSS + tiny JS (or generate from `contract.json`).
2. Mount inside an overflow-clipped relative container.
3. Trigger only for major validation failures.
4. Keep `HOLD IT!` / `That code isn't valid.` unless product asks otherwise.
5. No React, Tailwind, host tokens, external fonts, or audio required.
