import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#020b15;">
  {{specimen}}
</div>
`.trim()

export const memoryFragmentReveal: Specimen = {
  id: 'memory-fragment-reveal',
  ref: 'SPX-622',
  title: 'Memory Fragment Reveal',
  blurb:
    'Six translucent blue fragments carrying partial memory text converge into MEMORY // 03 / ARCHIVE — reconstruction before comprehension, seams still visible.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired memory / identity reconstruction',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3', 'persona-3-reload'],
  },
  tags: ['reconstruction', 'reveal', 'memory'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the assembled plate with seams, rule, and secondary copy appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Memory fragment reconstruction',
  },
  integration: [
    'Mount inside a relative, overflow-clipped host (~300×340 minimum).',
    'Import demo.css verbatim; keep frozen scatter offsets, 42ms stagger, and 340ms travel.',
    'Call reconstructMemoryFragments() / scatterMemoryFragments() or use the RECONSTRUCT / SCATTER controls.',
    'Keep the fragment stage aria-hidden; announce via the polite status region only.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the instant assembled path.',
  ],
  acceptance: [
    'Exactly six major fragments with meaningful partial text or structure',
    'Initial scatter offsets are deterministic; SCATTER restores the same origins',
    'Fragments converge with staggered arrivals (~42ms); no bounce or loop',
    'Alignment ticks appear on arrival; seams remain after lock',
    'Semantic status updates only once enough fragments align',
    'Rule draws L→R then secondary copy appears',
    'Reduced motion shows the reconstructed final state immediately',
    'No external assets or libraries; sandbox="allow-scripts" safe',
  ],
}
