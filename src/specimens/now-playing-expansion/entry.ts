import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const nowPlayingExpansion: Specimen = {
  id: 'now-playing-expansion',
  ref: 'SPX-1478',
  title: 'Now Playing Expansion',
  blurb:
    'NIGHT SIGNAL compact strip at 300×56 expands to 360×260 over 360ms; progress 01:42 persists; controls reveal prev, play, next, then volume.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired now playing expansion',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['media', 'compact-to-rich', 'playback'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate compact/expanded swap.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 300,
    background: 'dark',
    scaffold,
    label: 'Now playing expansion',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 300×56 compact and 360×260 expanded.',
    'Progress 01:42 must not reset on collapse.',
    'Controls reveal in deterministic order.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Track identity persists',
    'Progress does not reset',
    'Compact and expanded dimensions exact',
    'Controls reveal deterministically',
    'Reduced motion: instant state switch',
  ],
}
