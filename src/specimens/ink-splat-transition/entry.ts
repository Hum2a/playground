import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#f7f5ed;">
  {{specimen}}
</div>
`.trim()

export const inkSplatTransition: Specimen = {
  id: 'ink-splat-transition',
  ref: 'SPX-013',
  title: 'Ink Splat Transition',
  blurb:
    'Seven irregular ink blobs strike and expand to full purple coverage for a content swap, then peel away toward off-centre origins.',
  origin: {
    project: 'Original',
    surface: 'Splatoon-inspired playful ink transition language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'splatoon',
  },
  tags: ['ink', 'splat', 'liquid'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Splat travel/expansion is skipped under prefers-reduced-motion or data-force-reduced-motion; a solid purple coverage frame still hides the content change before reveal.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 320,
    background: 'page',
    scaffold,
    label: 'Page transition demo',
  },
  integration: [
    'Mount the demo surface and `.ink-splat` overlay inside a relative, overflow-hidden frame that matches the transition viewport.',
    'Import or inline demo.css verbatim; keep the frozen hex colours and border-radius blob geometry.',
    'Call runInkTransition(onCovered) from your trigger; put the A↔B (or route) swap only inside onCovered so it runs while fully covered (~500ms).',
    'Guard re-entrancy with the busy flag (or equivalent) so spam-clicks cannot stack overlays.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with a non-travelling solid cover → swap → reveal path.',
  ],
  acceptance: [
    'At least seven irregular ink shapes participate; multiple independent impact positions are visible at widths 320–768',
    'Satellite droplets appear during initial hits; solid purple backing plus splats fully cover before swap — no old-state flash',
    'Content swap happens only inside onCovered (~500ms); total sequence ~1100ms',
    'Exit peels/shrinks toward different off-centre directions; exits are non-mirrored (not reversed scale-in)',
    'Exact purple #7c28d9; lime accent #b7ef32 on one splat; no images, canvas, SVG assets, particle libs, or network',
    'Reduced motion works via prefers-reduced-motion and data-force-reduced-motion with no splat travel/expansion',
    'Spam-click safe; overlay stays aria-hidden; works under sandbox="allow-scripts" without parent/storage/fetch',
  ],
}
