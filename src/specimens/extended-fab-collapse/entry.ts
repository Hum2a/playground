import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim()

export const extendedFabCollapse: Specimen = {
  id: 'extended-fab-collapse',
  ref: 'SPX-1586',
  title: 'Extended FAB Collapse',
  blurb:
    '152×56 extended FAB contracts to 56×56 icon-only over 240ms when scroll down exceeds 48px — right edge anchored; expands after 36px up-scroll.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired extended FAB scroll collapse',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['fab', 'scroll', 'adaptive-control'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, width state switches immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 390,
    height: 420,
    background: 'dark',
    scaffold,
    label: 'Extended FAB collapse',
  },
  integration: [
    'Mount inside relative overflow-hidden host.',
    'Import demo.css verbatim; freeze 152→56px width over 240ms.',
    'Label fades before width finishes shrinking.',
    'Right edge remains fixed during collapse.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Right edge remains fixed',
    'Minor scroll jitter does not toggle state',
    'Label never spills outside shrinking container',
    'Down 48px / up 36px thresholds differ',
    'At scroll top extended state restored',
    'Reduced motion: immediate width switch',
  ],
}
