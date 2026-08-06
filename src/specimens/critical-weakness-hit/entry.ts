import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#020912;">
  {{specimen}}
</div>
`.trim()

export const criticalWeaknessHit: Specimen = {
  id: 'critical-weakness-hit',
  ref: 'SPX-489',
  title: 'Critical Weakness Hit',
  blurb:
    'Short exploit feedback: MEMORY compresses, four blue corner lines attack, the plate splits into three offset layers, then WEAKNESS yields to RESOLVED under one cut.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Reload–inspired tactical UI language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3-reload'],
  },
  tags: ['impact', 'confirmation', 'hud'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, RESOLVED appears immediately with no compress/attack/split/cut.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 320,
    height: 300,
    background: 'dark',
    scaffold,
    label: 'Critical weakness hit',
  },
  integration: [
    'Mount inside a relative host (~320×280+).',
    'Import demo.css verbatim; keep 70/70/80/140ms phases and layer offsets −4 / 0 / +4px.',
    'Call criticalWeaknessHit.run() / .reset() or rely on OPTIMISE / RESET buttons.',
    'State text swaps only after impact; final frame is static.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate RESOLVED path.',
  ],
  acceptance: [
    'Total sequence approximately 360ms',
    'Target compresses 1 → 0.96 over ~70ms before impact',
    'Exactly four blue angular lines attack from corners',
    'Impact shows three deterministic layers at −4px / 0 / +4px for ~80ms',
    'No random glitch and no repeated shake',
    'WEAKNESS exits up and RESOLVED enters from below after impact; one horizontal cut exits',
    'Final state is static RESOLVED',
    'Reduced motion immediate; no external assets; works under sandbox="allow-scripts"',
  ],
}
