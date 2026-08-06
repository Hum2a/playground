import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div class="lesson-card" style="position:relative;overflow:hidden;width:100%;height:200px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  <div class="lesson-card__content" style="opacity:0.55;padding:1rem;">
    <div style="font:700 0.65rem/1.2 system-ui,sans-serif;letter-spacing:0.18em;text-transform:uppercase;color:#767e8c;">MODULE 09</div>
    <div style="margin-top:0.4rem;font:600 0.95rem/1.25 system-ui,sans-serif;color:#e6e8ec;">RESTRICTED MATERIAL</div>
    <span class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">Locked: Restricted material</span>
  </div>
  {{specimen}}
</div>
`.trim()

export const corruptedAccessLock: Specimen = {
  id: 'corrupted-access-lock',
  ref: 'SPX-009',
  title: 'Corrupted Access Lock',
  blurb:
    'CSS-only locked-card overlay with ACCESS // DENIED, chromatic offsets, and brief glitch bursts every 3.4s over dimmed restricted material.',
  origin: {
    project: 'Original',
    surface: 'Cyberpunk-inspired malfunction / glitch lock language',
  },
  facets: {
    kind: 'overlay',
    tech: 'css-only',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'cyberpunk',
  },
  tags: ['glitch', 'lock', 'scanline'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Glitch bursts and scanline drift stop under prefers-reduced-motion or data-force-reduced-motion; the static ACCESS DENIED veil remains readable.',
  },
  files: { html, css },
  spec,
  contract,
  preview: {
    width: 360,
    height: 240,
    background: 'card',
    scaffold,
    label: 'Locked module card',
  },
  integration: [
    'Mount inside a container with position: relative and overflow: hidden so the veil and slices clip to the card.',
    'Dim the host interactive content (about opacity 0.55) while the lock is active.',
    'Import demo.css verbatim; keep the frozen hex colours, 3400ms / 180ms timing, and slice / channel offsets.',
    'Render the overlay only when the item is locked; keep the root decorative with aria-hidden.',
    'Expose a screen-reader-only “Locked: Restricted material” label on the host outside the decorative overlay.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with a static lock treatment.',
  ],
  acceptance: [
    'Host card remains readable between glitch bursts under the translucent veil',
    'Glitch occurs as brief ~180ms bursts every ~3400ms, not constant card shaking',
    'At least three independently displaced horizontal slices (-7px / 5px / 3px)',
    'Cyan and red channel duplicates offset by 3px and -2px during the burst only',
    'Locked state remains understandable with animation disabled (static ACCESS // DENIED)',
    'CSS-only; no canvas, images, SVG assets, or external dependencies',
    'Exact palette #090c0d / #f4e409 / #00e7e7 / #ff3045 and frozen timing/offsets',
    'Works from roughly 320–768px; overlay stays aria-hidden with sr-only locked label on host',
  ],
}
