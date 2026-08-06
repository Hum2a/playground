import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim()

export const dramaticObjectionError: Specimen = {
  id: 'dramatic-objection-error',
  ref: 'SPX-004',
  title: 'Dramatic Objection Error',
  blurb:
    'A huge typographic HOLD IT! burst slams across a form when a major validation failure occurs, then collapses to an inline field error.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'ace-attorney',
  },
  tags: ['validation', 'typography', 'burst'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Scale and rotation slam are skipped under prefers-reduced-motion or data-force-reduced-motion; a static HOLD IT! + strip appear briefly, then the inline field error remains.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 280,
    background: 'card',
    scaffold,
    label: 'Access code form',
  },
  integration: [
    'Mount inside a container with position: relative and overflow: hidden so the shout and burst clip to the host.',
    'Import demo.css verbatim; keep the frozen hex colours, timings, and class names.',
    'Reserve the interruption for major validation failures — not ordinary inline field hints.',
    'Call runDramaticObjection() (or equivalent phase toggles) on invalid submit; keep burst/shout nodes fixed in the DOM.',
    'Associate the real error message with the input via aria-describedby, aria-invalid, and role="alert"; keep the overlay aria-hidden.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with a non-slamming path that still exposes the field error.',
  ],
  acceptance: [
    'Invalid submission triggers one HOLD IT interruption',
    'HOLD IT visibly overshoots (scale ~2.4 → 0.92 → 1) before settling',
    'Error explanation strip follows the impact (~300–520ms)',
    'Actual form error remains semantically accessible on the field',
    'No copyrighted assets or audio',
    'Reduced motion removes slam movement',
    'Repeated invalid submissions remain stable without accumulating DOM',
    'Works at 320px',
  ],
}
