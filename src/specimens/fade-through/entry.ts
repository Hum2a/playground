import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#14161c;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const fadeThrough: Specimen = {
  id: 'fade-through',
  ref: 'SPX-1577',
  title: 'Fade Through',
  blurb:
    'Two-phase 300ms content swap: outgoing fades 0–105ms, incoming 105–300ms; outer container stays fixed; no full-opacity overlap.',
  origin: {
    project: 'Original',
    surface: 'Android Material fade-through transition',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['fade-through', 'content-swap'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Instantaneous content replacement or ≤80ms opacity-only handoff.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 340,
    height: 420,
    background: 'dark',
    scaffold,
    label: 'Fade through transition',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~340×420).',
    'Import demo.css verbatim; freeze duration 300ms, phase split 105ms, scale 0.96.',
    'Wire resetFadeThrough / replayFadeThrough.',
    'Outer geometry must remain stationary.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Outer geometry does not move',
    'Outgoing state relinquishes visibility before incoming state establishes itself',
    'Both directions use identical phase boundaries',
    'Rapid toggling cannot leave two visible states',
    'Reduced-motion state remains immediately understandable',
  ],
}
