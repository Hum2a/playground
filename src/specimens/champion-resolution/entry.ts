import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:440px;background:#0e1016;">
  {{specimen}}
</div>
`.trim()

export const championResolution: Specimen = {
  id: 'champion-resolution',
  ref: 'SPX-1147',
  title: 'Champion Resolution',
  blurb:
    'MODEL ARENA // 08 finalises ATLAS 92 over NOVA 87: margin +05, eight structural rays, six historical paths, and a canonical CHAMPION stamp — no confetti.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired World Tournament champion resolution (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['result', 'selection', 'completion'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, FINALISE immediately shows the champion composition.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 460,
    background: 'dark',
    scaffold,
    label: 'Champion resolution demo',
  },
  integration: [
    'Mount in a relative overflow-hidden host.',
    'Keep frozen scores 92/87, +05 margin, 8 rays, and 6 historical paths at 25ms stagger.',
    'Call runChampionResolution / resetChampionResolution; NOVA must remain as runner-up.',
    'Do not add confetti, trophies, or looping celebration motion.',
  ],
  acceptance: [
    'Exactly two finalists and six historical markers',
    'Scores resolve to 92 and 87; difference +05; NOVA remains runner-up',
    'Exactly eight winner rays; historical paths converge on ATLAS',
    'Tournament becomes COMPLETE; no confetti; static final; reduced motion immediate',
  ],
}
