import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#020912;">
  {{specimen}}
</div>
`.trim()

export const fullMoonMilestone: Specimen = {
  id: 'full-moon-milestone',
  ref: 'SPX-TODO',
  title: 'Full Moon Milestone',
  blurb:
    'Numeric progress ticks 74→75, then a symbolic lunar sweep fills to a full moon with ring, eight radial marks, and PHASE III — while the progressbar stays honestly at 75%.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired lunar milestone language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3', 'persona-3-reload'],
  },
  tags: ['milestone', 'completion', 'lunar'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, jumps to 75% with a static full-moon emblem, PHASE III, and MILESTONE COMPLETE — no sweep or radial marks.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Full moon milestone',
  },
  integration: [
    'Mount inside a relative host (~360×340+).',
    'Import demo.css verbatim; keep shade translateX(illum * -1%) and frozen timings.',
    'Drive complete/reset via window.fullMoonMilestone or the control buttons.',
    'Never set aria-valuenow above 75 after the milestone — full moon is iconography only.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate 75% + full emblem path.',
  ],
  acceptance: [
    'Numeric progress moves 74→75 over ~220ms',
    'After hold, moon illumination sweeps symbolically to full while progress stays 75%',
    'Thin outer ring appears at full; exactly eight radial marks flash then disappear',
    'PHASE III rises through a clipped slot; MILESTONE COMPLETE appears below',
    'Final state is static; progress semantics remain 75%',
    'Reduced motion immediate; no external assets; works under sandbox="allow-scripts"',
  ],
}
