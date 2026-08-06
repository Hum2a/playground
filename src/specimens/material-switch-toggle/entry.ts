import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:220px;background:#f4f5f7;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const materialSwitchToggle: Specimen = {
  id: 'material-switch-toggle',
  ref: 'SPX-1719',
  title: 'Material Switch Toggle',
  blurb:
    'Three 52×32 switches: off, on, and disabled. Checkbox-driven thumb travels 20px with 180ms track fill, 1.08 pulse, and 40px touch ripple.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired switch control',
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
  tags: ['switch', 'control', 'state'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, thumb jumps to target with no scale or ripple.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 320,
    height: 260,
    background: 'card',
    scaffold,
    label: 'Material switch toggle',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 52×32 track, 24px thumb, 20px travel.',
    'Wire resetMaterialSwitchToggle; native checkbox is authoritative.',
    '40px ripple on pointer-down centred on thumb.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Native checkbox state is authoritative',
    'Thumb travel is exactly 20px',
    'Disabled switch cannot toggle',
    'Keyboard Space works',
    'State remains distinguishable without animation',
    'Reduced motion: instant thumb position, no ripple',
  ],
}
