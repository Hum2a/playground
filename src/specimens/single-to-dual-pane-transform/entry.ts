import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const singleToDualPaneTransform: Specimen = {
  id: 'single-to-dual-pane-transform',
  ref: 'SPX-1955',
  title: 'Single-to-Dual Pane Transform',
  blurb:
    'Resizable 320–760px preview crosses 600px into 260px list + detail dual-pane over 320ms; selection and detail DOM persist.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired adaptive master/detail layout',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['adaptive', 'responsive', 'master-detail'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, layout switches immediately at the breakpoint.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 760,
    height: 380,
    background: 'dark',
    scaffold,
    label: 'Single-to-dual pane transform',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 600px breakpoint and 260px list pane.',
    'Preserve selected item DOM identity across layout changes.',
    'Narrow shrink shows detail if one is selected, otherwise list.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Breakpoint is exactly 600px',
    'Selected item survives both directions',
    'No content is duplicated during transition',
    'Wide state has persistent master and detail',
    'Narrow state remains fully navigable',
    'Reduced motion: instant layout switch',
  ],
}
