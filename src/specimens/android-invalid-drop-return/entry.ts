import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim()

export const androidInvalidDropReturn: Specimen = {
  id: 'android-invalid-drop-return',
  ref: 'SPX-1900',
  title: 'Invalid Drop Return',
  blurb:
    '220×70 task card rejected over LOCKED — 90ms boundary flash, 260ms overshoot return capped at 6px; INBOX absorbs without return animation.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired invalid drag-drop return physics',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['drag-drop', 'error', 'return'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, invalid cue then instant proxy restore.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 390,
    height: 300,
    background: 'dark',
    scaffold,
    label: 'Invalid drop return',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 220×70 card, 260ms return, 6px overshoot cap.',
    'Placeholder prevents source collapse during drag.',
    'LOCKED triggers 90ms flash; INBOX absorbs without return.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Return starts from exact release coordinates',
    'Source placeholder remains until return completes',
    'LOCKED gives one 90ms boundary flash',
    'Proxy removed only after reaching source',
    'Valid INBOX drop never runs return animation',
    'Reduced motion: instant return after invalid cue',
  ],
}
