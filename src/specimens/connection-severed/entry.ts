import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#1c1c1c;">
  {{specimen}}
</div>
`.trim()

export const connectionSevered: Specimen = {
  id: 'connection-severed',
  ref: 'SPX-323',
  title: 'Connection Severed',
  blurb:
    'An irregular angular tether joins Archive to Portfolio; disconnect tensions it, snaps the centre into three fragments, and recoils both halves into independent UNLINKED cards.',
  origin: {
    project: 'Original',
    surface: 'Graphic unlink / relationship sever interaction',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  tags: ['disconnect', 'unlink', 'relationship'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Tension, snap, fragments, and recoil are skipped under prefers-reduced-motion or data-force-reduced-motion; the tether disappears immediately and UNLINKED labels appear.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 320,
    background: 'dark',
    scaffold,
    label: 'Linked entities',
  },
  integration: [
    'Mount inside a relative overflow-hidden host so recoil fragments and tether travel stay clipped.',
    'Import demo.css verbatim; keep frozen tether segment polygons, 12→5px tension height, 20px gap, and timings.',
    'Wire severConnection / reconnectConnection / replayConnectionSevered without duplicating nodes.',
    'Keep data-state in sync with the polite status announcement; leave tether geometry aria-hidden.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate UNLINKED settle.',
  ],
  acceptance: [
    'Two distinct entities are visibly connected by an irregular 3-segment tether',
    'Tension pulls cards ~3px apart and narrows the centre (~12px → 5px) before the snap',
    'Snap opens a ~20px central gap with exactly three angular fragments',
    'Both tether halves recoil toward their cards; cards recoil ~2px outward then settle',
    'Final state shows UNLINKED on both cards with no remaining line',
    'Reconnect restores the tether for demo replay',
    'Reduced motion removes the connection immediately',
    'Status announces Archive disconnected from Portfolio.',
    'Exact geometry and timing are frozen in contract.json',
  ],
}
