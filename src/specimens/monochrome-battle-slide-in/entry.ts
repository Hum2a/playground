import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0f1b16;">
  {{specimen}}
</div>
`.trim()

export const monochromeBattleSlideIn: Specimen = {
  id: 'monochrome-battle-slide-in',
  ref: 'SPX-855',
  title: 'Monochrome Battle Slide-In',
  blurb:
    'Four-tone Gen I–inspired confrontation: pixel bands interrupt SEARCHING, then abstract LOCAL and REMOTE entities step in from opposite sides — right leading — before ground chunks and labels lock a static face-off.',
  origin: {
    project: 'Original',
    surface: 'Pokémon Gen I / Game Boy battle spatial language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['retro', 'confrontation', 'arrival'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the final LOCAL vs REMOTE confrontation appears immediately with no bands or stepped slide-ins.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Monochrome battle slide-in',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~360×340+).',
    'Import demo.css verbatim; keep the four-tone palette, 16×16 / 4px entities, steps(6) slides, and 60ms right lead.',
    'Call monochromeBattleSlideIn.run() / .reset() or use ENCOUNTER / RESET.',
    'Do not replace steps() with smooth easing; do not use Pokémon sprites or fonts.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate battle layout.',
  ],
  acceptance: [
    'Exactly four visible palette tones: #0f1b16 #40513c #8b9c68 #d6ddb0',
    'Original abstract 16×16 pixel entities; no Pokémon sprites',
    'Three horizontal bands interrupt with steps() (~160ms)',
    'Right entity begins ~60ms before left; both use steps(6, end) over ~300ms to ~28% / ~72%',
    'Ground lines build in four discrete chunks after arrival; labels use steps(3, end)',
    'Final confrontation is completely static; reduced motion immediate',
  ],
}
