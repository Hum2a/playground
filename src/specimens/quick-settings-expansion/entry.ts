import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#12141a;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const quickSettingsExpansion: Specimen = {
  id: 'quick-settings-expansion',
  ref: 'SPX-1648',
  title: 'Quick Settings Expansion',
  blurb:
    '360×96 compact strip morphs to 360×330 panel over 360ms — first four controls reposition into 2×3 grid; extras fade after 45% progress.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired quick settings expansion',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['quick-settings', 'grid', 'container-transform'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate geometry switch.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 400,
    background: 'dark',
    scaffold,
    label: 'Quick settings expansion',
  },
  integration: [
    'Mount inside relative overflow-clipped host.',
    'Import demo.css verbatim; freeze compact and expanded dimensions.',
    'First four controls maintain compact→expanded continuity.',
    'Collapse restores original order.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'First four controls have visible compact→expanded continuity',
    'Extra controls only in expanded phase',
    'Expanded layout fits without overflow',
    'Collapse restores original order',
    'No proprietary Android icons',
    'Reduced motion: immediate geometry switch',
  ],
}
