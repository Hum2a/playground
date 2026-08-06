import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const handoffContinuation: Specimen = {
  id: 'handoff-continuation',
  ref: 'SPX-1493',
  title: 'Handoff Continuation',
  blurb:
    'EDIT // REPORT at 68% handoffs from DESKTOP to TABLET across six bridge segments; ownership flips at midpoint; TABLET continues to 74%.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired cross-device handoff',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['handoff', 'cross-device', 'continuity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediately move task ownership to TABLET at 68%, then show 74%.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 480,
    height: 280,
    background: 'dark',
    scaffold,
    label: 'Handoff continuation',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze six bridge segments, 180×92→92×48 compression.',
    'Progress stays 68% through transfer; ownership changes once at midpoint.',
    'TABLET continues progress to 74% after arrival.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'DESKTOP owns task initially',
    'Exactly six bridge segments during handoff',
    'Progress never resets from 68%',
    'Ownership changes once at midpoint',
    'TABLET receives same task identity',
    'TABLET continues from 68 to 74',
    'Reduced motion: instant handoff then 74%',
  ],
}
