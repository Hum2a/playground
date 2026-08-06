import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim()

export const permissionPromptMaterialise: Specimen = {
  id: 'permission-prompt-materialise',
  ref: 'SPX-1842',
  title: 'Permission Prompt Materialise',
  blurb:
    '320×250 decision surface over 0.28 scrim — scale 0.94→1 in 220ms; While using / Only this time / Don\'t allow; denial snackbar.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired permission prompt materialise',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['permission', 'modal', 'system-surface'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, prompt appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 390,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Permission prompt materialise',
  },
  integration: [
    'Mount inside relative overflow-clipped host.',
    'Import demo.css verbatim; no browser permission APIs.',
    'Focus trapped while dialog open; Escape denies.',
    'Grant updates feature card to Enabled.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Never calls browser permission APIs',
    'All three choices produce deterministic states',
    'Focus trapped while open',
    'Escape behaves like denial',
    'Host feature visibly reflects result',
    'Reduced motion: immediate prompt',
  ],
}
