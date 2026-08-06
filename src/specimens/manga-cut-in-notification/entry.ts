import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#1c1c1c;">
  {{specimen}}
</div>
`.trim()

export const mangaCutInNotification: Specimen = {
  id: 'manga-cut-in-notification',
  ref: 'SPX-104',
  title: 'Manga Cut-In Notification',
  blurb:
    'A narrow diagonal slit attacks across the host, expands into a black/red comic strip with BUILD COMPLETE!, holds still, then collapses without reversing perfectly.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired manga cut-in interruption',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['notification', 'interruption', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Slit expansion, text travel, and host split are skipped under prefers-reduced-motion or data-force-reduced-motion; the static strip appears and clears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    scaffold,
    label: 'Cut-in notification demo',
  },
  integration: [
    'Mount inside a relative overflow-hidden host so the 120%-wide diagonal strip clips at the edges.',
    'Import demo.css verbatim; keep frozen hex colours, 2px slit, 110px strip height, -3deg rotation, and timings.',
    'Call fireMangaCutIn / replayMangaCutIn without duplicating nodes.',
    'Announce via the polite status node only; keep the decorative strip aria-hidden.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with a static strip path.',
  ],
  acceptance: [
    'Effect begins as a ~2px slit that expands into a diagonal strip (not an opacity fade)',
    'Red/black layers are visibly misregistered (~7px); strip ~110px tall at -3deg',
    'SYSTEM and BUILD COMPLETE! enter from different directions/times; headline overshoots ~8px',
    'Strip remains still during ~900ms hold; exit collapses then retracts (non-mirrored)',
    'Host splits no more than ±3px; no character imagery',
    'One polite status announcement; reduced motion is static; sandbox-safe; 320–768px',
    'Exact dimensions/timing frozen in contract.json',
  ],
}
