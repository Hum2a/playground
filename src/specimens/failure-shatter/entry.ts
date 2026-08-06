import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim()

export const failureShatter: Specimen = {
  id: 'failure-shatter',
  ref: 'SPX-318',
  title: 'Failure Shatter',
  blurb:
    'Export appears to succeed, then a red strike fractures the SUCCESS panel into four pieces before FAILED and ERROR // 042 take over.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['error', 'failure', 'impact'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Processing, false SUCCESS, strike, and fracture are skipped under prefers-reduced-motion or data-force-reduced-motion; the specimen jumps straight to FAILED + ERROR // 042 + TRY AGAIN.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Failure shatter export',
  },
  integration: [
    'Mount inside a relative overflow-hidden frame (~360×340+).',
    'Import demo.css verbatim; keep frozen SUCCESS enter, strike, four-piece travel, and FAILED slam values.',
    'Never announce temporary SUCCESS to AT — only the final failure status is live.',
    'Wire runFailureShatter / resetFailureShatter (or harness restart); TRY AGAIN must fully reset before another run.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate FAILED state (no SUCCESS flash).',
  ],
  acceptance: [
    'PROCESSING then SUCCESS begins entering and is interrupted by a red strike',
    'SUCCESS fractures into four major pieces plus three small fragments',
    'FAILED becomes the stable final state with ERROR // 042 and TRY AGAIN',
    'Exactly one semantic failure announcement; SUCCESS never announced',
    'Nothing loops; retry resets deterministically',
    'Reduced motion skips misleading temporary success',
    'No external assets/libraries/network; works ~320–768px',
  ],
}
