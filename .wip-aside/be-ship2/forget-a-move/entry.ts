import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#141a1e;">
  {{specimen}}
</div>
`.trim()

export const forgetAMove: Specimen = {
  id: 'forget-a-move',
  ref: 'SPX-325',
  title: 'Forget a Move',
  blurb:
    'Four occupied capability slots; select one to replace (canonical CACHE), watch it leave with a vacancy pause, then SYNC installs into the same structural position.',
  origin: {
    project: 'Original',
    surface: 'Pokémon four-move limit–inspired capability replacement',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['replacement', 'capability', 'decision'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Selection remains usable; REPLACE instantly swaps the selected capability to SYNC with no exit/install travel under prefers-reduced-motion or data-force-reduced-motion.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'Forget a move demo',
  },
  integration: [
    'Mount in a relative overflow-hidden host wide enough for four slots and the −70px exit.',
    'Import demo.css verbatim; freeze compress/exit/vacancy/install/sweep timings.',
    'Wire runForgetMove / resetForgetMove; treat REPLACE as committed once the sequence starts.',
    'Keep radiogroup semantics; announce Replace {old} with SYNC via the polite region.',
    'Honour both reduced-motion triggers with instant label swap after confirmation.',
  ],
  acceptance: [
    'Begins with four occupied capabilities and a separate SYNC token',
    'User can select which capability is replaced; canonical demo replaces CACHE',
    'CACHE visibly leaves before SYNC arrives; slot stays empty ~100ms',
    'SYNC occupies the exact same slot; final list is SCAN FILTER EXPORT SYNC',
    'No crossfade text swap; four corner brackets mark selection',
    'Reduced motion keeps selection usable and replaces immediately on confirm',
  ],
}
