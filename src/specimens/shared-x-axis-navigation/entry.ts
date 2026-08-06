import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:700px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim()

export const sharedXAxisNavigation: Specimen = {
  id: 'shared-x-axis-navigation',
  ref: 'SPX-1568',
  title: 'Shared X-Axis Navigation',
  blurb:
    'Three-step hierarchy with 300ms shared-axis panel transitions; persistent progress chrome; nav locks during animation.',
  origin: {
    project: 'Original',
    surface: 'Android Material shared-axis forward navigation',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['shared-axis', 'navigation', 'x-axis'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Content swaps with opacity only; no translation or scale.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 520,
    background: 'dark',
    scaffold,
    label: 'Shared X-axis navigation',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~360×480 viewport + chrome).',
    'Import demo.css verbatim; freeze offset 30px, scale 0.92, duration 300ms.',
    'Wire resetSharedXAxisNavigation / replaySharedXAxisNavigation.',
    'Progress label stays outside animated plane.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Forward and back directions are visually opposite',
    'Incoming and outgoing panels overlap only during the transition',
    'Persistent chrome never moves',
    'Navigation buttons lock during the 300ms transition',
    'Returning to Overview restores the exact original state',
  ],
}
