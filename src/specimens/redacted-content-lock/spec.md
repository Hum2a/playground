# Redacted Content Lock (portable recreation spec)

Locked-state lesson card: thick irregular black redaction bars censor specific
copy regions, then a diagonal red `RESTRICTED` paper label attacks into the
lower-right. Inspired by Persona 5 graphic print / collage language and physical
censorship imagery — not a page transition. Rebuild from this document,
`demo.css`, and `contract.json`. No copyrighted Persona assets, fonts, or logos.

## Visual intent

- Static locked result must read: content exists here, but access is restricted
- Content stays in the DOM; bars overlay portions — never one full-card rectangle
- Settled state does not loop, pulse, or glitch
- Prefer CSS for the locked graphics; tiny JS only drives lock/unlock demo

## DOM structure

```html
<div class="rcl" data-redacted-lock data-state="locked">
  <article class="rcl__card">
    <div class="rcl__content" data-rcl-content aria-hidden="true">
      <p class="rcl__meta">
        LESSON
        <span class="rcl__censor rcl__censor--meta">
          <span class="rcl__readable">12</span>
          <span class="rcl__bar rcl__bar--4" aria-hidden="true"></span>
        </span>
      </p>
      <h2 class="rcl__title">
        <span class="rcl__censor">
          <span class="rcl__readable">ADVANCED TYPESCRIPT</span>
          <span class="rcl__bar rcl__bar--1" aria-hidden="true"></span>
        </span>
      </h2>
      <p class="rcl__desc">
        <span class="rcl__censor">…conditional types… + bar--2</span>
        <span class="rcl__censor">…mapped types… + bar--3</span>
      </p>
      <button class="rcl__action" data-rcl-action disabled>
        <span class="rcl__censor">OPEN LESSON + bar--5</span>
      </button>
    </div>
    <div class="rcl__stamp" aria-hidden="true">
      <span class="rcl__stamp-back"></span>
      <span class="rcl__stamp-face">RESTRICTED</span>
    </div>
  </article>
  <!-- demo controls + status live region -->
</div>
```

Bars attach to local `.rcl__censor` wrappers — not absolute coordinates across the
whole host — so alignment holds from ~320–768px.

## Copy

| Role | Text |
| ---- | ---- |
| Title | `ADVANCED TYPESCRIPT` |
| Description | `Learn conditional types, mapped types and infer patterns.` |
| Metadata | `LESSON` / `12` |
| Action | `OPEN LESSON` |
| Stamp | `RESTRICTED` |
| SR locked | `Advanced Typescript. Restricted content.` |

## Colours

| Token | Hex |
| ----- | --- |
| Black | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Frozen bar geometry

Typical height **16–26px**. Rotation **−2deg → 2deg**. Irregular `clip-path` edges.

| Bar | Target | Direction | Rotate | Height | Delay |
| --- | ------ | --------- | ------ | ------ | ----- |
| 1 | Part of title | left | −1.2deg | 22px | 0ms |
| 2 | Description portion A | right | 1.5deg | 18px | 65ms |
| 3 | Description portion B | left | −0.8deg | 20px | 120ms |
| 4 | Metadata value `12` | top-right | 2deg | 16px | 180ms |
| 5 | Action label/area | right | −1.5deg | 26px | 240ms |

Each enter overshoots ~**4–8px** then settles. Bar travel ≈ **100ms**.

## Lock choreography (~520ms)

1. Bars enter sequentially at the delays above
2. After bar 5 lands (~340ms), `RESTRICTED` stamp attacks diagonally (~**−5deg**)
3. Stamp has black offset backing **5px / 6px**, duration **~180ms**
4. Total ≈ **520ms**; then idle — no further motion

## Unlock choreography (~360ms)

1. Stamp exits first (~80ms)
2. Bars retract in reverse semantic order (5 → 1) with staggered starts
3. Underlay becomes progressively readable; **do not fade** host content
4. Total ≈ **360ms**

## Interaction

While locked, `OPEN LESSON` is **disabled** / `aria-disabled="true"`. A covering
overlay is not a security boundary — gate access in application logic.

## Reduced motion

Honour both:

- `@media (prefers-reduced-motion: reduce)`
- `[data-force-reduced-motion="true"]`

Switch **instantly** between fully redacted and fully readable. No bar travel.

## Accessibility

- Decorative bars and stamp: `aria-hidden="true"`
- Specimen demo exposes: **Advanced Typescript. Restricted content.** while locked
- Hide underlying readable nodes from AT when access is denied (`aria-hidden` on
  content wrapper in the demo)
- Production integrations must control actual content accessibility per access rules —
  do not leave sensitive copy available to assistive tech merely because it sits
  visually under bars

## Porting checklist

1. Copy markup + CSS (palette, bar geometry, clip-paths, timings)
2. Nest bars on local text wrappers; keep underlay in the DOM
3. Disable the primary action while locked; announce restricted state separately
4. Wire lock/unlock (or CSS class swaps); verify both reduced-motion triggers
5. Confirm settled state is static and unlock does not fade host copy
