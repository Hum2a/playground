# Corrupted Access Lock (portable recreation spec)

Locked-state card overlay in original cyberpunk malfunction / glitch UI language.
Dark translucent veil, `ACCESS // DENIED`, chromatic cyan/red duplicates, three
horizontal glitch slices, scanlines, warning brackets, and technical microcopy.
Rebuild from this document, `demo.css`, and `contract.json`. No copyrighted
Cyberpunk 2077 logos, fonts, icons, or exact UI.

## Visual intent

- Host card stays faintly readable between glitches (veil opacity ~0.78)
- Most of the time the lock is still; glitch is a brief ~180ms burst every 3400ms
- Do not continuously shake the host card
- CSS-only — no JS, canvas, images, or external assets

## DOM structure

Host content lives in the preview scaffold (or your card). Overlay mounts as
`{{specimen}}` inside a relative, overflow-hidden frame.

```html
<!-- Host (scaffold) -->
<div class="lesson-card" style="position:relative;overflow:hidden;…">
  <div style="opacity:0.55;…">MODULE 09 / RESTRICTED MATERIAL</div>
  <span class="sr-only">Locked: Restricted material</span>
  <!-- specimen: -->
  <div class="corrupt-lock" aria-hidden="true">
    <div class="corrupt-lock__veil"></div>
    <div class="corrupt-lock__scanlines"></div>
    <div class="corrupt-lock__brackets"></div>
    <p class="corrupt-lock__code">ERR_LOCK_09</p>
    <div class="corrupt-lock__title">
      <span class="corrupt-lock__title-main">ACCESS // DENIED</span>
      <span class="corrupt-lock__title-cyan" aria-hidden="true">ACCESS // DENIED</span>
      <span class="corrupt-lock__title-red" aria-hidden="true">ACCESS // DENIED</span>
    </div>
    <div class="corrupt-lock__slice corrupt-lock__slice--1">ACCESS // DENIED</div>
    <div class="corrupt-lock__slice corrupt-lock__slice--2">ACCESS // DENIED</div>
    <div class="corrupt-lock__slice corrupt-lock__slice--3">ACCESS // DENIED</div>
    <p class="corrupt-lock__micro">SYS.AUTH // FAIL · SECTOR 09 · READ=0</p>
  </div>
</div>
```

## Colours

| Token | Hex / value |
| ----- | ----------- |
| Near-black | `#090c0d` |
| Warning yellow | `#f4e409` |
| Cyan | `#00e7e7` |
| Error red | `#ff3045` |
| Veil | `rgb(9 12 13 / 0.78)` |

## Frozen motion

Cycle **3400ms**. Burst window **180ms** (keyframes rest through **94.7%**, burst
**94.71%–100%**). Easing: `steps(2, end)` on channel/slice bursts.

| Element | Burst offset |
| ------- | ------------ |
| Slice 1 | `translateX(-7px)` relative to centred rest |
| Slice 2 | `translateX(5px)` |
| Slice 3 | `translateX(3px)` |
| Cyan duplicate | `translate(3px, 0)` |
| Red duplicate | `translate(-2px, 0)` |

Scanlines may drift slowly over the same 3400ms period. Everything returns exactly
to rest after each burst.

## Reduced motion

Honour both:

- `@media (prefers-reduced-motion: reduce)`
- `[data-force-reduced-motion="true"]` on the document element

Disable all glitch bursts and scanline movement. Keep the static ACCESS DENIED
treatment (veil, title, code, brackets, microcopy).

## Accessibility

- Overlay root: `aria-hidden="true"`
- Chromatic duplicates and slices are decorative
- Expose one clean label outside the overlay: **Locked: Restricted material**
- Idle: `pointer-events: none`

## Porting checklist

1. Copy markup + CSS (colours, keyframes, offsets)
2. Mount inside `position: relative; overflow: hidden` card; dim host ~0.55
3. Add the sr-only locked label on the host
4. Verify brief bursts (not constant shake) and both reduced-motion triggers
5. Confirm exact hex colours and frozen offsets
