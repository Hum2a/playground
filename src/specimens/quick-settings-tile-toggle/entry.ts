import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#10141c;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const quickSettingsTileToggle: Specimen = {
  id: 'quick-settings-tile-toggle',
  ref: 'SPX-1647',
  title: 'Quick Settings Tile Toggle',
  blurb:
    '148×72 Network tile — bounded ripple on press; active backing grows from 40px circle to full tile over 260ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired quick settings tile',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['quick-settings', 'tile', 'state'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, state changes instantly with ≤80ms opacity cue.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    scaffold,
    label: 'Quick settings tile toggle',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze tile 148×72 and 260ms backing.',
    'Wire resetQuickSettingsTileToggle on replay.',
    'Network tile uses aria-pressed for state.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Ripple and persistent selection are separate layers',
    'Selected state unmistakable without colour alone',
    'Active backing grows from icon region',
    'Toggle is keyboard operable',
    'Repeated toggles never distort tile geometry',
    'Reduced motion: instant state with opacity cue',
  ],
}
