import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:180px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const playPauseGlyphMorph: Specimen = {
  id: 'play-pause-glyph-morph',
  ref: 'SPX-1477',
  title: 'Play/Pause',
  blurb:
    '48×48 control morphs play triangle into pause bars over 180ms/160ms for SIGNAL // 04; label swaps at 50%; compresses to .96 on press.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired playback glyph morph',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['media', 'icon-morph', 'playback'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, instant glyph state swap without morph.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 240,
    height: 180,
    background: 'dark',
    scaffold,
    label: 'Play/pause glyph morph',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 48×48 control and morph timings.',
    'One persistent glyph container; no duplicate play/pause icons.',
    'Keyboard activation via Space/Enter.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'One persistent glyph container',
    'No simultaneous full play and pause icons',
    'State toggles repeatedly without geometry drift',
    'Keyboard activation works',
    'Reduced motion: instant glyph swap',
  ],
}
