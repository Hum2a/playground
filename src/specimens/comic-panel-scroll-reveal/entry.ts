import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim()

export const comicPanelScrollReveal: Specimen = {
  id: 'comic-panel-scroll-reveal',
  ref: 'SPX-212',
  title: 'Comic Panel Scroll Reveal',
  blurb:
    'Internal scroll container where opposing irregular comic panels tear apart once each section hits ~35% visibility.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['comic', 'reveal', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Covers are not shown under prefers-reduced-motion or data-force-reduced-motion; all section content is immediately readable with no IntersectionObserver reveal path.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 400,
    background: 'dark',
    scaffold,
    label: 'Comic panel scroll reveal',
  },
  integration: [
    'Mount inside a relative overflow-hidden frame (~360×380+).',
    'Import demo.css verbatim; keep frozen panel clip-paths, threshold 0.35, and exit transforms.',
    'Root IntersectionObserver to the specimen scroller only — never parent scroll or parent DOM.',
    'Call resetComicPanelScroll() (or harness restart) to restore covers and scrollTop.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with covers hidden.',
  ],
  acceptance: [
    'Own overflow-y auto scroll region; independent of parent-page scroll',
    'Three sections start covered (normal motion) and reveal once at ~35% intersection',
    'Opposing panels depart; content exists beneath covers throughout',
    'Three related but non-identical panel geometries',
    'Scrolling backward does not re-cover; reset restores covers + scroll position',
    'Reduced motion shows all content immediately readable',
    'No scroll libraries, network, or parent access; works ~320–768px',
  ],
}
