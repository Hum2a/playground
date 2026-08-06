import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:240px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  {{specimen}}
</div>
`.trim()

export const callingCardPeel: Specimen = {
  id: 'calling-card-peel',
  ref: 'SPX-012',
  title: 'Calling Card Peel',
  blurb:
    'A crooked printed notice curls from one corner, peels diagonally across its host, and flicks away to reveal the content underneath.',
  origin: {
    project: 'Original',
    surface: "Persona 5's handmade graphic interface language",
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
  tags: ['reveal', 'paper', 'peel', 'unlock'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Corner curl, diagonal peel, and release flick are skipped under prefers-reduced-motion or data-force-reduced-motion; the obstruction disappears immediately and host content stays available.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 280,
    background: 'card',
    scaffold,
    label: 'Covered archive card',
  },
  integration: [
    'Mount host content inside a position:relative; overflow:hidden container.',
    'Place the calling-card peel obstruction above that content; keep underlying nodes in the DOM for the whole sequence.',
    'Import demo.css verbatim; freeze paper/ink/red hexes, clip-paths, and phase timings.',
    'Trigger with peelCallingCard(onRevealed) or the PEEL NOTICE button; ignore re-entry while busy.',
    'After reveal, enable host actions and clear any restricted-state messaging in the application.',
    'Use resetCallingCardPeel / replayCallingCardPeel (or harness restart) to restore the attached-paper state.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an instant reveal.',
  ],
  acceptance: [
    'Begins with paper already attached; no entrance animation',
    'Upper-right corner moves before the majority of the sheet',
    'Visible fold/underside during peel; diagonal reveal TR → BL via clip-path',
    'Underlying content exists throughout and is progressively uncovered (not injected at the end)',
    'Black backing offset ~7px/9px with ~40ms separation from the paper',
    'Sequence ~1040ms; release faster than lift; paper leaves by geometry not opacity fade',
    'Busy-safe; reset restores attached state; works ~320–768px',
    'Reduced motion via prefers-reduced-motion and data-force-reduced-motion',
    'Decorative paper is aria-hidden; status announces restricted/revealed',
  ],
}
