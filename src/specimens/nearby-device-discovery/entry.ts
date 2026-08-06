import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:480px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const nearbyDeviceDiscovery: Specimen = {
  id: 'nearby-device-discovery',
  ref: 'SPX-1866',
  title: 'Nearby Device Discovery',
  blurb:
    'DISCOVER reveals four fixed radial recipient nodes at 120ms intervals; orbit rings draw once; NODE C becomes ready after 900ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired nearby sharing discovery',
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
  tags: ['nearby', 'discovery', 'transfer'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all recipients appear immediately in final positions.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 480,
    background: 'dark',
    scaffold,
    label: 'Nearby device discovery',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 120ms stagger, 260ms settle, 900ms ready.',
    'Four recipients at fixed radial positions; NODE C receives ready border/check.',
    'Orbit rings draw once per discovery run.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Node positions are fixed between runs',
    'Discovery has a finite end state',
    'Ready state is structurally distinguishable',
    'Re-running resets cleanly',
    'No network or Bluetooth APIs are called',
    'Reduced motion: instant recipient appearance',
  ],
}
