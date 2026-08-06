import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#161616;">
  {{specimen}}
</div>
`.trim()

export const objectiveAcquired: Specimen = {
  id: 'objective-acquired',
  ref: 'SPX-319',
  title: 'Objective Acquired',
  blurb:
    'Independent graphic pieces assemble into a persistent NEW OBJECTIVE card — red strip, black panel, slamming title, late progress, and finishing corner pins.',
  origin: {
    project: 'Original',
    surface: 'Graphic objective-activation announcement',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['objective', 'announcement', 'activation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Assembly is skipped under prefers-reduced-motion or data-force-reduced-motion; the final objective card appears immediately and stays.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    scaffold,
    label: 'Objective assembly demo',
  },
  integration: [
    'Mount inside a relative overflow-hidden frame.',
    'Import demo.css verbatim; keep frozen hex colours and 850ms piece windows.',
    'Call acquireObjective for first show; use clearObjective / replayObjective for deterministic replay without DOM accumulation.',
    'Announce once via the polite status node; keep visual typography aria-hidden.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate final card.',
  ],
  acceptance: [
    'Objective begins absent; at least five pieces assemble from multiple directions',
    'Main objective text is dominant with ~5px overshoot; progress attaches late',
    'Two pin impacts finish assembly with ~2px card shifts',
    'Card remains permanently afterward; nothing loops',
    'Reduced motion shows the final card immediately',
    'Exact assembly timing documented; no external dependencies/assets',
    'One polite announcement: New objective: Build the Archive. Create 50 portable specimens.',
  ],
}
