import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:500px;background:#0f141c;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const largeTitleCollapse: Specimen = {
  id: 'large-title-collapse',
  ref: 'SPX-1371',
  title: 'Large Title Collapse',
  blurb:
    'PROJECTS large title (42px) condenses into a 17px compact nav title over 84px scroll; compact established by 72px with 54px upward travel and 12 list rows.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired large title navigation collapse',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['scroll', 'typography', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Scroll-linked state changes remain; interpolated scale movement removed under both reduced-motion triggers.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 560,
    background: 'dark',
    scaffold,
    label: 'Large title collapse',
  },
  integration: [
    'Mount inside a relative overflow-hidden host; scroll viewport 380×500, nav 52px.',
    'Import demo.css verbatim; freeze large 42px, compact 17px, collapse 0–84px, compact at 72px.',
    'Wire resetLargeTitleCollapse; scroll syncs --ltc-scroll custom properties.',
    'Large and compact titles share PROJECTS identity with spatial handoff.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Large title PROJECTS visible at scroll top with 12 ACTIVE subtitle',
    'Collapse occurs over 84px scroll range',
    'Compact 17px title established by 72px scroll',
    'Title remains readable throughout transition',
    'Scrolling back to top restores large title state',
    'At least 12 list rows present',
    'Reduced motion: scroll-linked without scale interpolation',
  ],
}
