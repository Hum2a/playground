import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:600px;background:#141218;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const collapsingAppBar: Specimen = {
  id: 'collapsing-app-bar',
  ref: 'SPX-1762',
  title: 'Collapsing App Bar',
  blurb:
    '152px app bar collapses to 64px over first 96px scroll; same title element interpolates 32→20px; divider after 88px.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired collapsing toolbar',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['scroll', 'app-bar', 'header'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Geometry updates directly from scroll position under both reduced-motion triggers.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 400,
    height: 600,
    background: 'dark',
    scaffold,
    label: 'Collapsing app bar',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze bar 152/64px, collapse range 96px.',
    'Wire resetCollapsingAppBar.',
    'Same title element — no duplicate headers.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Header height maps continuously over first 96px scroll',
    'Same title element survives large and compact states',
    'Trailing action remains reachable',
    'Divider appears only after scrollY > 88px',
    'Scrolling back to top restores exact large state',
  ],
}
