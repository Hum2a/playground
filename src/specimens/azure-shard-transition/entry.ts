import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#071b33;">
  {{specimen}}
</div>
`.trim()

export const azureShardTransition: Specimen = {
  id: 'azure-shard-transition',
  ref: 'SPX-005',
  title: 'Azure Shard Transition',
  blurb:
    'Seven translucent crystalline shards and a solid deep-navy angular wipe cover for a content swap, then drift upward and outward.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Reload–inspired crystalline blue transition language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['shard', 'crystalline', 'wipe'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Shard travel is skipped under prefers-reduced-motion or data-force-reduced-motion; a solid deep-navy coverage frame still hides the content change before reveal.',
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
    'Mount the demo surface and `.azure-shard` overlay inside a relative, overflow-hidden frame that matches the transition viewport.',
    'Import or inline demo.css verbatim; keep the frozen hex colours and clip-path polygons.',
    'Call runShardTransition(onCovered) from your trigger; put the A↔B (or route) swap only inside onCovered so it runs while fully covered (~560ms).',
    'Guard re-entrancy with the busy flag (or equivalent) so spam-clicks cannot stack overlays.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with a non-travelling solid cover → swap → reveal path.',
  ],
  acceptance: [
    'Seven distinct clipped shards are visible during the cover window at widths 320–768',
    'Solid deep-navy backing plus shards fully cover the viewport before the swap; no old-state flash',
    'Content swap happens only inside onCovered (~560ms); coverage window spans ~480–650ms',
    'Exit drifts primarily upward/outward at varied speeds; exits are non-mirrored',
    'Exact hex colours #071b33 / #0878c9 / #41c9ff / #dff7ff / #f7fcff; no blur-heavy glass, images, canvas, or SVG assets',
    'Reduced motion works via prefers-reduced-motion and data-force-reduced-motion with no shard travel',
    'Spam-click safe; overlay stays aria-hidden; works under sandbox="allow-scripts" without parent/storage/fetch',
  ],
}
