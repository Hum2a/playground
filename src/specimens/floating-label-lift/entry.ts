import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:200px;background:#f8f9fb;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const floatingLabelLift: Specimen = {
  id: 'floating-label-lift',
  ref: 'SPX-1727',
  title: 'Floating Label Lift',
  blurb:
    '300×58 outlined field: label lifts to y=-7px with 12px type and surface patch on focus or value; 180ms border emphasis; error text below.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired outlined text field',
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
  tags: ['textfield', 'focus', 'form'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, label position changes instantly.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 340,
    height: 240,
    background: 'card',
    scaffold,
    label: 'Floating label lift',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 300×58 field and 180ms label transition.',
    'Wire resetFloatingLabelLift; label stays floated when value non-empty.',
    'Error toggle adds supporting text without moving label.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Label stays floated whenever value is non-empty',
    'Placeholder is not used as a fake label',
    'Error text creates real layout space',
    'Clicking label focuses input',
    'Field remains usable with keyboard only',
    'Reduced motion: instant label position',
  ],
}
