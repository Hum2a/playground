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

export const invalidFieldShake: Specimen = {
  id: 'invalid-field-shake',
  ref: 'SPX-1530',
  title: 'Invalid Field Shake',
  blurb:
    'PROJECT CODE field refuses invalid ORBIT? with exact finite shake offsets, inline error expansion, and success tick on ORBIT-7.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired validation refusal',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['validation', 'shake', 'form'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, no shake — error boundary and message appear immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 320,
    height: 260,
    background: 'dark',
    scaffold,
    label: 'Invalid field shake',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze shake offsets and 310ms duration.',
    'Wire resetInvalidFieldShake.',
    'Valid pattern: uppercase letters, digits, hyphen only.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Invalid value produces exact offset sequence 0,-6,+5,-4,+3,-2,0',
    'Field returns to exact original position',
    'Error region uses layout space (34px)',
    'Correct ORBIT-7 clears error and shows success tick',
    'No looping shake',
    'Reduced motion: immediate error without shake',
  ],
}
