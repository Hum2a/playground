import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#020b16;">
  {{specimen}}
</div>
`.trim()

export const ripplePortalTransition: Specimen = {
  id: 'ripple-portal-transition',
  ref: 'SPX-406',
  title: 'Ripple Portal Transition',
  blurb:
    'A pale disturbance blooms at a fixed off-centre origin; three ripples expand while a circular portal reveals depth that already waits inside the growing radius.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 water / depth–inspired radial portal',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['ripple', 'radial-reveal', 'liquid'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Ripple expansion and radial reveal are skipped under prefers-reduced-motion or data-force-reduced-motion; State B appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    scaffold,
    label: 'Ripple portal demo',
  },
  integration: [
    'Mount inside a relative overflow-hidden frame.',
    'Keep State B clipped from origin 68%/58% from the start; do not late-swap or crossfade-only.',
    'Import demo.css verbatim; keep frozen origin, ring radii/delays, and ~700ms total.',
    'Call runRippleEnter / runRippleReturn; busy-guard re-entrancy; restart resets origin exactly.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate State B show.',
  ],
  acceptance: [
    'Fixed non-central origin at 68% 58%; no click-position randomness',
    'Initial disturbance precedes at least three ripple rings',
    'Destination reveal shares the same origin and exists inside the growing radius',
    'Narrow refraction band follows the reveal boundary; cover exceeds host diagonal',
    'Rings continue briefly after full reveal then stop; no looping',
    'Reduced motion is immediate; exact origin/radii/delays documented',
  ],
}
