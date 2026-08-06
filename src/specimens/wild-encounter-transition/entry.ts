import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#17211b;">
  {{specimen}}
</div>
`.trim()

export const wildEncounterTransition: Specimen = {
  id: 'wild-encounter-transition',
  ref: 'SPX-700',
  title: 'Wild Encounter Transition',
  blurb:
    'Abrupt encounter interruption: a single jolt, seven opposing horizontal bands, a growing central plate with an abstract CSS entity, then full destination takeover — no crossfade.',
  origin: {
    project: 'Original',
    surface: 'Pokémon-inspired wild encounter interruption language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['interruption', 'arrival', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Disturbance and travelling bands are skipped under prefers-reduced-motion or data-force-reduced-motion; the destination encounter state appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'Wild encounter transition',
  },
  integration: [
    'Mount `.we__host` as a relative overflow-hidden frame so bands and the plate clip cleanly.',
    'Import demo.css verbatim; freeze the battle palette, 7 bands, 110% travel, 4px→38%→100% plate, and 720ms total.',
    'Wire runWildEncounter / resetWildEncounter / replayWildEncounter; destination content must exist inside the clipped plate from the start.',
    'Do not use opacity crossfade as the primary transition — use band travel and clipped plate growth.',
    'Guard re-entrancy with the busy flag; honour prefers-reduced-motion and data-force-reduced-motion with an immediate destination path.',
  ],
  acceptance: [
    'State A (ROUTE // 04 + 3 records) is visible before encounter',
    'Exactly seven horizontal bands; adjacent bands travel opposite directions',
    'Disturbance is a single 120ms jolt (0→-5→4→0), not continuous shake',
    'Encounter plate grows beneath departing bands (4px→38%) then expands to 100%',
    'Abstract entity uses original CSS geometry (horns/head/body/core/base)',
    'Destination completely replaces initial state; no primary crossfade',
    'Animation finishes static; REPLAY resets then re-runs',
    'Reduced motion immediately shows destination',
    'Works at ~320–768px; timings and geometry frozen in contract.json',
  ],
}
