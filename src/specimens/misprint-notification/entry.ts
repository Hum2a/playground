import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#1a1a1a;">
  {{specimen}}
</div>
`.trim()

export const misprintNotification: Specimen = {
  id: 'misprint-notification',
  ref: 'SPX-016',
  title: 'Misprint Notification',
  blurb:
    'Misregistered black/red/cyan/paper print layers snap into alignment as a NEW MESSAGE notification, then stay still until a separating dismiss.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired rough print registration language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['notification', 'misprint', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Layer convergence and separation are skipped under prefers-reduced-motion or data-force-reduced-motion; the final registered notification appears or clears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    scaffold,
    label: 'Misprint notification demo',
  },
  integration: [
    'Mount inside a relative overflow-hidden frame so misregistered layers and the exit clip stay readable.',
    'Import demo.css verbatim; keep frozen hex colours, initial offsets, overshoot values, and 460ms / 260ms timings.',
    'Call showMisprint / dismissMisprint / replayMisprint (or equivalent class toggles) without duplicating nodes.',
    'Keep a single role="status" paper layer; leave black/red/cyan stacks and registration marks aria-hidden.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediately registered (or instantly cleared) card.',
  ],
  acceptance: [
    'At least four visual layers participate (black, red, cyan, paper)',
    'Initial layers are visibly misregistered; red and cyan approach from different offsets',
    'Layers overshoot alignment once (~180ms) then recoil and lock by ~460ms',
    'Final notification is clearly readable; no looping glitch after settle',
    'Dismissal separates layers toward different directions over ~260ms (not opacity-only)',
    'Exactly one semantic notification is exposed to assistive technology',
    'Reduced motion starts fully registered and dismisses instantly',
    'Exact offsets/timing frozen; works 320–768px; no external assets; replay is deterministic',
  ],
}
