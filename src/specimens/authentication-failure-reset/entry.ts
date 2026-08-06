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

export const authenticationFailureReset: Specimen = {
  id: 'authentication-failure-reset',
  ref: 'SPX-1428',
  title: 'Authentication Failure Reset',
  blurb:
    'Scan field shakes 240ms on FAIL; four brackets rotate 8deg and retract 5px; NOT VERIFIED holds 650ms; restores to READY TO RETRY over 180ms.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired authentication failure reset',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['authentication', 'failure', 'retry'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, show NOT VERIFIED then READY TO RETRY without shake.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 280,
    height: 280,
    background: 'dark',
    scaffold,
    label: 'Authentication failure reset',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze shake sequence and timing.',
    'One finite rejection — no automatic retry loop.',
    'Field returns to exact origin.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'One finite rejection',
    'Field returns to exact origin',
    'Four brackets respond',
    'Retry state is clean',
    'No loop',
    'Reduced motion: no shake',
  ],
}
