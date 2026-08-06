import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#071525;">
  {{specimen}}
</div>
`.trim()

export const azureShardTransition: Specimen = {
  id: 'azure-shard-transition',
  ref: 'SPX-005',
  title: 'Blue Glass Shard Transition',
  blurb:
    'Seven major translucent blue glass panes and two accent slivers sweep the host, obscure via overlapping geometry, swap MIDNIGHT→DARK HOUR under full coverage, then continue their trajectories — cool P3 Reload language, original CSS only.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Reload–inspired cool blue glass / refraction transition',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['glass', 'refraction'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Pane travel is skipped under prefers-reduced-motion or data-force-reduced-motion; content swaps immediately with an optional static diagonal glass accent — no scale.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    scaffold,
    label: 'Blue glass page transition',
  },
  integration: [
    'Mount `.azure-shard-host` as a relative, overflow-hidden frame matching the transition viewport.',
    'Import demo.css verbatim; keep frozen hex colours, clip-path polygons, depths, and timings.',
    'Call runShardTransition(onCovered) from TRANSITION; put the A↔B swap only inside onCovered (~410ms) so it runs under full pane coverage.',
    'Do not add an opaque full-screen rectangle to cheat coverage — overlapping panes must provide it.',
    'Guard re-entrancy with the busy flag; honour prefers-reduced-motion and data-force-reduced-motion with an immediate swap path.',
  ],
  acceptance: [
    'Seven major panes + two thin accent slivers; large surfaces, not particles',
    'Three depth groups (rear/mid/fore) with distinct speeds and scales; pane 6 scales ≈1→1.15',
    'Staggered entrances; host genuinely covered by pane geometry by ~390–440ms (verified ~320–768px)',
    'Content swaps only inside onCovered (~410ms); no crossfade or visible morph',
    'Exit continues trajectories (non-mirrored); destination settles scale .985→1 over ~180ms',
    'No opaque coverage cheat, no blur glassmorphism, no Persona assets, no external deps',
    'Reduced motion swaps immediately; overlay aria-hidden; sandbox="allow-scripts" safe',
  ],
}
