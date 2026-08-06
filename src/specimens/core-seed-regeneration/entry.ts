import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#101218;">
  {{specimen}}
</div>
`.trim()

export const coreSeedRegeneration: Specimen = {
  id: 'core-seed-regeneration',
  ref: 'SPX-1128',
  title: 'Core Seed Regeneration',
  blurb:
    'An 18×18 canonical core (ID // 09) verifies, grows six skeleton lines, reconstructs six body regions by clip-expansion, then restores metadata to HEALTHY.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired core-seed / Cell-style regeneration recovery',
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
  tags: ['recovery', 'reconstruction', 'canonical-state'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, REBUILD immediately shows restored Worker 09.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 440,
    background: 'dark',
    scaffold,
    label: 'Core seed regeneration demo',
  },
  integration: [
    'Mount in a relative overflow-hidden host.',
    'Keep frozen region order central→top→left→right→bl→br and 45ms stagger.',
    'Regions must clip/expand from connection points — never fade in.',
    'Call runCoreSeedRegeneration / resetCoreSeedRegeneration; keep core ID // 09 visible.',
  ],
  acceptance: [
    'Begins with only tiny angular core; identity Worker 09',
    'Core verified before reconstruction; exactly six skeleton lines',
    'Exactly six major regions build outward (not fade); metadata after structure',
    'Identity 09 persists; final HEALTHY / STATE RESTORED; no looping',
    'Reduced motion immediately shows restored worker',
  ],
}
