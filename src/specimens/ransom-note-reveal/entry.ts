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

export const ransomNoteReveal: Specimen = {
  id: 'ransom-note-reveal',
  ref: 'SPX-019',
  title: 'Ransom Note Reveal',
  blurb:
    'Irregular printed paper scraps slam in from different directions and assemble NEW MATERIAL HAS ARRIVED! as a one-shot collage announcement.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 collage / cut-paper announcement language',
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
  tags: ['announcement', 'paper', 'clip-path', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Flying scraps, overshoots, and the final composition nudge are skipped under prefers-reduced-motion or data-force-reduced-motion; the completed collage appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 280,
    background: 'card',
    scaffold,
    label: 'Quiet announcement surface',
  },
  integration: [
    'Mount inside a relative, overflow-hidden surface (~240px tall).',
    'Import demo.css verbatim; keep frozen palette, clip-paths, delays, and easing.',
    'Call revealRansomNote() from REVEAL MESSAGE (or your control); ignore re-entry while busy.',
    'Keep visual scraps aria-hidden; announce once via the status region: “New material has arrived.”',
    'Use resetRansomNote / replayRansomNote (or harness restart) for deterministic replay.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the instant collage.',
  ],
  acceptance: [
    'Message assembles from four independently moving word scraps plus decorative scraps (8 total)',
    'Primary scraps have visibly different geometry; majors enter from ≥3 directions',
    'ARRIVED! is the final major word to settle; each major overshoots once',
    'Final collage stays readable; no runtime randomness; reset is deterministic',
    'Reduced motion shows the completed collage immediately',
    'No external assets/fonts/libraries; works in sandboxed iframe ~320–768px',
  ],
}
