import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#08080c;">
  {{specimen}}
</div>
`.trim()

export const instantTransmissionNavigation: Specimen = {
  id: 'instant-transmission-navigation',
  ref: 'SPX-1011',
  title: 'Instant Transmission Navigation',
  blurb:
    'SESSION // 04 locks REGION // B, collapses at A with residual fragments, vanishes for a short empty gap, then reconstructs at B — zero-distance relocation, never travelling the space between.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired Instant Transmission navigation language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['navigation', 'teleport', 'relocation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, SESSION // 04 appears immediately at B with A vacant.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 440,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'Instant transmission navigation',
  },
  integration: [
    'Mount inside a relative overflow-clipped host sized for two regions (~420×200).',
    'Import demo.css verbatim; keep lock/collapse/gap/arrive timings and fragment counts.',
    'Call transmitInstantNav() from TRANSMIT; resetInstantNav() or harness restart returns to A.',
    'Keep the stage aria-hidden; announce location via the polite status region.',
    'Honour both reduced-motion triggers with the immediate B placement.',
  ],
  acceptance: [
    'Entity begins only in A; B is acquired with exactly four brackets before departure',
    'Session collapses at A; never travels between regions; ~70ms empty teleport gap',
    'Exactly three departure fragments and three arrival fragments',
    'Reconstructs at B; A becomes VACANT; location metadata is B',
    'Reduced motion immediately shows final location; no looping effects',
    'No characters or franchise symbols; no external assets; sandbox="allow-scripts" safe',
  ],
}
