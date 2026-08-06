import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:200px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const swipeFullCommit: Specimen = {
  id: 'swipe-full-commit',
  ref: 'SPX-1508',
  title: 'Swipe Full Commit',
  blurb:
    'CACHE // BUILD-04 swipes left: DELETE readable at 72px, full commit at 190px with one marker, auto-delete collapses 64→0 over 220ms; UNDO restores.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired destructive swipe threshold',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['swipe', 'destructive', 'threshold'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, preserve thresholds but commit may collapse immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 200,
    background: 'dark',
    scaffold,
    label: 'Swipe full commit',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 72px reveal, 190px commit, 88px action-open.',
    'Release before full threshold settles to nearest closed or action-open state.',
    'Release after commit threshold auto-deletes with 220ms height collapse.',
    'UNDO restores exact row; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Two distinct thresholds at 72px and 190px',
    'DELETE readable at 72px swipe',
    'Full commit only at 190px with one commit marker',
    'Release before full threshold can leave action revealed at 88px',
    'Release after threshold deletes automatically',
    'Neighbour row visible; deleted row collapses height',
    'UNDO restores exact row position',
    'Reduced motion: instant collapse on commit',
  ],
}
