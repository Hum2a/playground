import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim()

export const contentDeclassification: Specimen = {
  id: 'content-declassification',
  ref: 'SPX-315',
  title: 'Content Declassification',
  blurb:
    'Classified archive sheet where a DECLASSIFIED stamp lands, then five redaction bars are split, peeled, or struck away in sequence until clearance is accepted.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['unlock', 'redaction', 'disclosure'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Stamp slam and sequential bar removals are skipped under prefers-reduced-motion or data-force-reduced-motion; the sheet reveals immediately with static DECLASSIFIED and CLEARANCE ACCEPTED marks.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 380,
    background: 'dark',
    scaffold,
    label: 'Content declassification',
  },
  integration: [
    'SECURITY: Visual redaction is not access control. Enforce permissions outside CSS; do not put sensitive strings in client markup unless the user is authorised.',
    'Mount inside a relative overflow-hidden frame (~360×360+). Nest bars on local text wrappers so wrapping stays aligned.',
    'Import demo.css verbatim; keep frozen bar clip-paths, rotations, behaviours (split/strike/peel), and 1380ms timeline.',
    'While locked, keep the sheet aria-hidden and announce the classified status summary; after grantClearance(), expose revealed semantics.',
    'Wire grantClearance / resetContentDeclassification (or harness restart). Honour both reduced-motion triggers with an immediate reveal.',
  ],
  acceptance: [
    'Exactly five redacted fragments; visual text exists beneath each bar',
    'DECLASSIFIED stamp lands before disclosures; PROJECT value first; ACCESS LEVEL last',
    'Three distinct removal behaviours demonstrated (split, strike-and-pull, peel)',
    'Underlying text barely moves; CLEARANCE ACCEPTED after final disclosure',
    'Nothing loops; reset restores all five redactions + stamp',
    'Reduced motion reveals immediately with static stamp/accepted',
    'Security/a11y warning documented; no external assets; works 320–768px',
  ],
}
