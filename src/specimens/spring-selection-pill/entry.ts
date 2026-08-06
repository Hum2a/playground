import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:100px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const springSelectionPill: Specimen = {
  id: 'spring-selection-pill',
  ref: 'SPX-1364',
  title: 'Spring Selection Marker',
  blurb:
    'Shared selection backing springs between DAY/WEEK/MONTH/YEAR with distinct long-jump and adjacent settle profiles.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired spring selection pill',
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
  tags: ['selection', 'spring', 'pill'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, backing jumps directly to selected segment.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 120,
    background: 'dark',
    scaffold,
    label: 'Spring selection pill',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze container 336×44 and spring timings.',
    'Wire resetSpringSelectionPill.',
    'Exactly one backing; rapid retarget from current position.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly four options',
    'Exactly one selection backing',
    'Long jump and adjacent jump have different spring responses',
    'Rapid retargeting does not duplicate markers',
    'Reduced motion: direct jump',
  ],
}
