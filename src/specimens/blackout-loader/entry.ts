import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#12141a;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const blackoutLoader: Specimen = {
  id: 'blackout-loader',
  ref: 'SPX-126',
  title: 'Blackout Loader',
  blurb:
    'Four irregular black polygons consume an archive card, hold with a minimal LOADING mark, telegraph with a red slash, then split diagonally to reveal an updated specimen count.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 aggressive black graphic loading language',
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
  tags: ['loading', 'clip-path', 'wipe'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Consumption and reveal travel are skipped under prefers-reduced-motion or data-force-reduced-motion; a static blackout LOADING state holds, then the destination count appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 280,
    background: 'dark',
    scaffold,
    label: 'Archive index card',
  },
  integration: [
    'Mount in a relative overflow-hidden host; the veil covers the full surface.',
    'Import demo.css verbatim; keep four frozen polygon clips and staggered consume timing.',
    'Call runBlackoutLoader from REFRESH INDEX; swap underlying data only after full coverage (~520ms).',
    'Set aria-busy while running; announce start/complete via status — not decorative LOADING chatter.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with static blackout then instant reveal.',
  ],
  acceptance: [
    'Initial 24-specimen content is visible before refresh',
    'Four black polygons consume from different edges without fading host content',
    'A brief irregular window remains before poly 4 closes; full cover by ~520ms',
    'Count swaps to 30 only under full blackout; LOADING indicator is not a circular spinner',
    'Red slash telegraphs ~150ms before reveal; polygons exit UL / LR over ~420ms',
    'Final state shows 30 specimens with veil gone; reset restores 24',
    'Reduced motion uses static blackout then immediate destination; no external assets',
  ],
}
