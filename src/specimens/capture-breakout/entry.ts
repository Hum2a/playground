import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#12161a;">
  {{specimen}}
</div>
`.trim()

export const captureBreakout: Specimen = {
  id: 'capture-breakout',
  ref: 'SPX-713',
  title: 'Capture Breakout',
  blurb:
    'A capture begins like Capture Shake — two checks land — then the third is interrupted, the capsule splits, and the entity escapes to ESCAPED.',
  origin: {
    project: 'Original',
    surface: 'Pokémon capture-fail / breakout language (generic geometry)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['failure', 'uncertainty', 'capture'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Enter, shakes, compress, and breakout travel are skipped under prefers-reduced-motion or data-force-reduced-motion; open container, visible target, and ESCAPED appear immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 380,
    background: 'dark',
    scaffold,
    label: 'Capture breakout demo',
  },
  integration: [
    'Mount in a relative overflow-hidden host tall enough for the ~95px escape.',
    'Keep visual family consistent with Capture Shake; do not share runtime modules unless extracting a shared primitive later.',
    'Import demo.css verbatim; preserve two complete shakes, 280ms long pause, 40% third interrupt, and six rays.',
    'Call runCaptureBreakout / runCaptureBreakoutRetry; allow retry after ESCAPED.',
    'Honour both reduced-motion triggers with an immediate escaped state.',
  ],
  acceptance: [
    'Capture initially appears valid; exactly two complete checks then an interrupted third',
    'Container compresses then opens structurally; exactly six breakout lines',
    'Entity returns outside; RESOLVING → ESCAPED; retry remains possible',
    'Final failure is non-destructive; no continuous shake; no official Poké Ball art',
    'Reduced motion shows open container + ESCAPED immediately',
  ],
}
