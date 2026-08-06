import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#e6e3dc;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const itemObtained: Specimen = {
  id: 'item-obtained',
  ref: 'SPX-802',
  title: 'Item Obtained',
  blurb:
    'ENERGY SHARD appears, holds for acknowledgement, then curves into the inventory slot — quantity stays ×02 until dock, then clips to ×03.',
  origin: {
    project: 'Original',
    surface: 'Pokemon-inspired item pickup / inventory acquisition',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['acquisition', 'inventory', 'feedback'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, inventory jumps to ×03 with static ITEM OBTAINED — no discovery or transfer.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 340,
    background: 'card',
    scaffold,
    label: 'Energy Shard acquisition (demo)',
  },
  integration: [
    'Mount inline; keep the 58×72px five-facet gem and lower-right inventory slot as the portable contract.',
    'Call runItemObtained from OBTAIN ITEM; never increment quantity before docking.',
    'Transfer uses a two-stage CSS path (no animation library); exactly two completion accents.',
    'Announce final quantity once via the status region — skip intermediate counts.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate final state.',
  ],
  acceptance: [
    'Item visibly appears outside inventory with exactly five primary facets',
    'Item is presented before storage, then physically travels into the slot',
    'Quantity remains ×02 until docking, then becomes ×03',
    'Exactly two completion accents; final state static at ENERGY SHARD ×03',
    'Reduced motion immediately shows ×03 and ITEM OBTAINED',
  ],
}
