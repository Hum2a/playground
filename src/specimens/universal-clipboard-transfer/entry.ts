import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:220px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const universalClipboardTransfer: Specimen = {
  id: 'universal-clipboard-transfer',
  ref: 'SPX-1494',
  title: 'Universal Clipboard Transfer',
  blurb:
    'BUILD-184 token 96×34 lifts 8px from DESKTOP; six-dot corridor; 70ms absence gap; reconstructs at TABLET caret; status PASTED.',
  origin: {
    project: 'Original',
    surface: 'Apple-inspired universal clipboard handoff',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['clipboard', 'cross-device', 'handoff'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate copied/pasted state.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 500,
    height: 220,
    background: 'dark',
    scaffold,
    label: 'Universal clipboard transfer',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze token size and six corridor dots.',
    'Destination caret exists before arrival.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Text identity persists',
    'Exactly six corridor dots',
    'There is a visible absence gap',
    'Destination caret pre-exists',
    'Final text is BUILD-184',
    'Reduced motion: instant transfer',
  ],
}
