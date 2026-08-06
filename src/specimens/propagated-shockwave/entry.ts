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

export const propagatedShockwave: Specimen = {
  id: 'propagated-shockwave',
  ref: 'SPX-1088',
  title: 'Propagated Shockwave',
  blurb:
    'CONFIG // ROOT impacts, emits three concentric rings, and updates six distance-ordered dependents from STALE to UPDATED.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired shockwave / consequence-propagation feedback',
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
  tags: ['propagation', 'dependency', 'impact'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, APPLY CHANGE immediately shows PROPAGATED root and all six UPDATED nodes.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 400,
    height: 440,
    background: 'dark',
    scaffold,
    label: 'Propagated shockwave demo',
  },
  integration: [
    'Mount in a relative overflow-hidden host (~400×400 stage).',
    'Keep frozen radii A70–F166 and hitAt = 140 + 520 × (r / 190).',
    'Call runPropagatedShockwave / resetPropagatedShockwave; each node updates once.',
    'Rings are finite thin outlines — do not loop or leave glow.',
  ],
  acceptance: [
    'Exactly six dependents at fixed deterministic positions',
    'Exactly three shockwave rings; nodes update by spatial distance (A before F)',
    'Each node reacts once with 3px radial bump, STALE→UPDATED clip, two ticks ~90ms',
    'All nodes end UPDATED; ROOT PROPAGATED; rings disappear; static final',
    'Reduced motion immediately shows completed propagation',
  ],
}
