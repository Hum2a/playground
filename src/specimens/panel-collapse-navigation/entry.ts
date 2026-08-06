import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0a0a0a;">
  {{specimen}}
</div>
`.trim()

export const panelCollapseNavigation: Specimen = {
  id: 'panel-collapse-navigation',
  ref: 'SPX-021',
  title: 'Panel Collapse Navigation',
  blurb:
    'Opposing irregular comic panels crush the current content into a vertical slit, cover for a swap, then tear apart diagonally.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired comic-panel crush transition',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['comic', 'wipe', 'crush'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Crushing panel travel is skipped under prefers-reduced-motion or data-force-reduced-motion; a static full-coverage frame still hides the content change before reveal.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    scaffold,
    label: 'Page transition demo',
  },
  integration: [
    'Mount the demo surface and `.panel-collapse` overlay inside a relative, overflow-hidden frame.',
    'Import demo.css verbatim; keep frozen hex colours, clip-path polygons, slit widths, and 980ms timing.',
    'Call runPanelCollapse(onCovered); put the A↔B swap only inside onCovered (~550ms) while fully covered.',
    'Guard re-entrancy with the busy flag so spam-clicks cannot stack overlays.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with static cover → swap → reveal.',
  ],
  acceptance: [
    'Current content is visibly compressed between two opposing panels via clip-path (not opacity fade)',
    'Content reaches a narrow ~6px slit before disappearing; full coverage before swap (~550ms)',
    'No old-state flash; reveal is diagonal (UL / LR), not a reverse of the collapse',
    'NEXT briefly appears during coverage (~120ms); total sequence ≈980ms',
    'Exact palette #090909 / #e60012 / #f5f1e8; flat fills only',
    'Reduced motion removes crushing/travel; spam-click safe; overlay aria-hidden; sandbox-safe',
    'Works 320–768px; no external assets/libraries/network',
  ],
}
