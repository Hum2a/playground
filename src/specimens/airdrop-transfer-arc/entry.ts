import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:240px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const airdropTransferArc: Specimen = {
  id: 'airdrop-transfer-arc',
  ref: 'SPX-1487',
  title: 'AirDrop Transfer Arc',
  blurb:
    'REPORT.PDF sends to DEVICE // B after acceptance; four brackets, 520ms quadratic arc with progress 0–100, recipient expands 4px, final RECEIVED.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired nearby transfer arc',
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
  tags: ['transfer', 'arc', 'nearby'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, show accepted then received without arc travel.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 240,
    background: 'dark',
    scaffold,
    label: 'AirDrop transfer arc',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 260ms acceptance, 520ms arc, 74×44 proxy.',
    'Transfer begins only after ACCEPTED; four acquisition brackets on recipient.',
    'Progress steps 0,25,50,75,100; proxy compresses into recipient.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Transfer does not begin before acceptance',
    'Exactly four acquisition brackets on recipient',
    'One file proxy follows arc path',
    'Progress reaches 100',
    'Proxy ends inside recipient, not floating nearby',
    'Final status RECEIVED',
    'Reduced motion: skip arc travel',
  ],
}
