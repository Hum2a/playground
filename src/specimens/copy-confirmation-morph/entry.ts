import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:120px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const copyConfirmationMorph: Specimen = {
  id: 'copy-confirmation-morph',
  ref: 'SPX-1549',
  title: 'Copy Confirmation Morph',
  blurb:
    '72×32 COPY control compresses copy outlines into a check, clips to COPIED for 900ms, then morphs back — no clipboard API.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired copy confirmation microinteraction',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['copy', 'morph', 'confirmation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, labels swap without geometric morph; 900ms dwell retained.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 280,
    height: 160,
    background: 'dark',
    scaffold,
    label: 'Copy confirmation morph',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze control 72×32 and timing sequence.',
    'Wire resetCopyConfirmationMorph.',
    'Rapid clicks during dwell restart dwell without duplicate geometry.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'One control morphs geometry to success',
    'COPIED persists 900ms',
    'Returns to COPY',
    'Rapid clicks do not accumulate elements',
    'Reduced motion: label swap only with 900ms dwell',
  ],
}
