import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#12141a;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim()

export const radarPulseDiscovery: Specimen = {
  id: 'radar-pulse-discovery',
  ref: 'SPX-946',
  title: 'Radar Pulse Discovery',
  blurb:
    'Three staggered concentric pulses expand from a fixed origin through a marker field; hidden targets react only when a leading edge reaches them, and NODE // C locks as the discovered result.',
  origin: {
    project: 'Original',
    surface: 'Pokémon radar-style spatial search / discovery',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['search', 'radar', 'discovery'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Expanding rings and staggered target reactions are skipped; origin, NODE // C, origin→C link, and SIGNAL FOUND appear immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 440,
    height: 420,
    background: 'dark',
    scaffold,
    label: 'Radar pulse discovery demo',
  },
  integration: [
    'Mount inside a relative overflow-hidden frame.',
    'Import demo.css verbatim; preserve frozen marker/target coordinates and ring timings.',
    'Call runRadarPulseScan / runRadarPulseReset; SCAN replays after a completed discovery.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate found state.',
    'Do not randomise target or marker positions at runtime.',
  ],
  acceptance: [
    'Exactly 24 ordinary field markers and exactly four hidden targets at frozen positions',
    'Search origin is a distinct 10×10 diamond at 38% / 58%',
    'SCAN emits exactly three border-only rings with starts at 0 / 180 / 360ms, each expanding 16→420px over 900ms',
    'Targets react only when pulse leading edge reaches them (D→C→A→B); C is the canonical result',
    'C gains scale 2.2, four bracket segments, NODE // C label, and lasting origin→C link',
    'Status clips NO SIGNAL → SIGNAL FOUND; pulses clear after propagation; no perpetual loop',
    'Reduced motion shows found state immediately; result also announced as text',
  ],
}
