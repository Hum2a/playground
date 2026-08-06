import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #1a2a38;border-radius:2px;background:#020b15;">
  {{specimen}}
</div>
`.trim()

export const energyTransferSync: Specimen = {
  id: 'energy-transfer-sync',
  ref: 'SPX-618',
  title: 'Energy Transfer Sync',
  blurb:
    'Archive (READY v1.4) sends one angular blue energy packet along a three-segment path to Playground (OUTDATED v1.3); on arrival the target updates vertically and the link settles to SYNCED.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 directional sync / energy-transfer language',
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
  tags: ['progress', 'hud', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Packet travel, trail, and arrival motion are skipped under prefers-reduced-motion or data-force-reduced-motion; target immediately shows READY v1.4 with SYNCED.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 300,
    background: 'dark',
    scaffold,
    label: 'Archive → Playground sync',
  },
  integration: [
    'Mount source, three-segment path, and target inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze path waypoints, packet 18×12 diamond, and phase timings.',
    'Call runEnergyTransfer / resetEnergyTransfer; swap target status only after packet arrival.',
    'Source stays READY throughout — this is copy/sync, not move.',
    'Announce Synchronising. then Playground synchronised to version 1.4. via aria-live; do not announce packet position.',
    'Honour both reduced-motion triggers with an immediate synced pose.',
  ],
  acceptance: [
    'Source READY v1.4 and target OUTDATED v1.3 are visibly different before sync',
    'Connection (3 angular segments) is visible before sync',
    'Exactly one primary packet travels source → target along the path',
    'Temporary trail illuminates behind the packet; no chasing packets',
    'Midpoint marker pulses once (~50% travel); target anticipates near ~80%',
    'Target does not update before arrival; arrival scales + 3 blue hit lines',
    'OUTDATED→READY and v1.3→v1.4 swap vertically (no crossfade)',
    'Final link thickens to 3px and SYNCED appears; source unchanged',
    'Nothing loops; RESET restores OUTDATED v1.3 with no leftover packets',
    'Reduced motion immediately shows final synced state',
    'No external dependencies or network; legible around 320px',
  ],
}
