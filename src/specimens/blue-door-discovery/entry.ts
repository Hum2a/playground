import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#cfd6db;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const blueDoorDiscovery: Specimen = {
  id: 'blue-door-discovery',
  ref: 'SPX-621',
  title: 'Blue Door Discovery',
  blurb:
    'An ordinary archive surface hides a doorway: INSPECT brightens a tiny clue, a seam grows, door geometry appears only then, and panels open onto secret content that was already behind — discovery, not a known entrance.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired mysterious blue-door discovery language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['discovery', 'reveal', 'hidden-content'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the open discovered composition appears immediately with status announcement — no seam/door travel.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 400,
    height: 320,
    background: 'card',
    scaffold,
    label: 'Hidden doorway discovery (demo)',
  },
  integration: [
    'Mount `.bdd__host` with overflow hidden; keep secret content in the DOM behind the surface from the start.',
    'Import demo.css verbatim — clue position, doorway 41%×72%, and timings are the contract.',
    'Call runBlueDoorDiscover from INSPECT; runBlueDoorClose from CLOSE; do not expose secret semantics until opened.',
    'Announce once: “Hidden specimen discovered.” Keep FX layers aria-hidden.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate opened state.',
  ],
  acceptance: [
    'Initial surface looks complete; only one static 12px pale-blue clue at 50%/68%',
    'INSPECT grows a vertical seam both ways from the clue, then side lines and ±3px shift',
    'Door geometry appears only after the seam; secret content already exists behind',
    'Doors open without content crossfade; DISCOVERED appears near 75% open; frame remains',
    'CLOSE restores the ordinary surface and tiny clue; reduced motion jumps to opened',
    'No Velvet Room / game door artwork; geometry and timing documented in spec/contract',
  ],
}
