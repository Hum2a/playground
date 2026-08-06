import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0e1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const stageManagerStackShift: Specimen = {
  id: 'stage-manager-stack-shift',
  ref: 'SPX-1353',
  title: 'Stage Manager Stack Shift',
  blurb:
    'BUILD foreground (two windows) swaps with staged RESEARCH (three mini silhouettes) over 480ms; scale 1↔0.72 with ±190px travel; z-order transfers at 52%.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired Stage Manager workspace swap',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['workspace', 'stage', 'depth'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, group layouts swap instantly without large travel.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 480,
    height: 400,
    background: 'dark',
    scaffold,
    label: 'Stage Manager stack shift',
  },
  integration: [
    'Mount inside a relative overflow-clipped host; foreground 360×330, rail 92px.',
    'Import demo.css verbatim; freeze swap 480ms, scale 0.72, translate ±190px, z at 52%.',
    'Wire resetStageManagerStackShift; SWAP toggles BUILD ↔ RESEARCH.',
    'Both groups remain visible during swap; one stage marker transfers.',
    'Honour both reduced-motion triggers with instant swap.',
  ],
  acceptance: [
    'Two distinct groups: BUILD (2 windows) and RESEARCH (3 windows)',
    'BUILD begins foreground; RESEARCH begins staged in rail',
    'Both remain visible during 480ms swap',
    'Z-order changes once at 52% progress',
    'Final RESEARCH workspace contains three windows',
    'BUILD remains available as staged two-window stack in rail',
    'Reduced motion: instant layout swap',
  ],
}
