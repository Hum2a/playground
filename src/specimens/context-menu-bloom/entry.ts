import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101218;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const contextMenuBloom: Specimen = {
  id: 'context-menu-bloom',
  ref: 'SPX-1392',
  title: 'Context Menu Bloom',
  blurb:
    'FILE // NOTES.MD blooms a four-action menu from its trailing anchor — 6px node, 188×176 boundary, 35ms row stagger — collapsing back on dismiss.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired contextual menu anchor expansion',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['context-menu', 'anchor', 'expansion'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, menu appears/disappears immediately at the anchored position.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 280,
    background: 'dark',
    scaffold,
    label: 'Context menu bloom',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~360×280).',
    'Import demo.css verbatim; freeze anchor 6px/60ms, boundary 188×176/180ms, row stagger 35ms.',
    'Wire openContextMenuBloom / dismissContextMenuBloom on source row click.',
    'Dismiss via outside click or ESC; collapse toward anchor over 150ms.',
    'Honour both reduced-motion triggers with immediate anchored menu.',
  ],
  acceptance: [
    'Menu originates from FILE // NOTES.MD trailing anchor, not centre-screen',
    'Exactly four actions: OPEN, RENAME, DUPLICATE, DELETE',
    'Boundary constructs before all rows appear (anchor 60ms then expand 180ms)',
    'First row receives selection backing after stagger',
    'Dismiss collapses toward anchor over 150ms',
    'ESC and outside click dismiss; focus restored to source',
    'Reduced motion: immediate appear/disappear at anchor',
  ],
}
