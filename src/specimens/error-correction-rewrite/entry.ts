import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:240px;background:#1b1e26;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const errorCorrectionRewrite: Specimen = {
  id: 'error-correction-rewrite',
  ref: 'SPX-313',
  title: 'Error Correction Rewrite',
  blurb:
    'Localised typo correction: only gmial is underlined, marked WRONG, struck, and replaced with gmail while humza@ and .com stay put — demo validation choreography.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 editorial / collage validation language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['clip-path', 'slam'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Underline, WRONG badge, strike, and travel are skipped under prefers-reduced-motion or data-force-reduced-motion; the corrected email and CORRECTED label appear immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 260,
    background: 'dark',
    scaffold,
    label: 'Email field (demo)',
  },
  integration: [
    'Mount inline; keep the field overflow hidden so extract/clip stays local.',
    'Import demo.css verbatim; monospace value + 5ch fragment slot keep alignment predictable.',
    'Call runErrorCorrection from CHECK VALUE; never mutate real user input from this specimen.',
    'Announce once: “Correction: gmial replaced with gmail.” Decorative strike/badge stay aria-hidden.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate correction.',
  ],
  acceptance: [
    'Initial value clearly reads humza@gmial.com with gmial as the targeted fragment',
    'Red underline and WRONG badge identify only the erroneous substring',
    'Black strike crosses gmial only; humza@ and .com remain visually stable',
    'Wrong fragment extracts; gmail enters the same slot with one overshoot',
    'Final value is humza@gmail.com with a CORRECTED label; nothing loops',
    'Reset restores the typo; one status announcement; reduced motion corrects immediately',
    'No external fonts/assets/libraries; works ~320–768px',
  ],
}
