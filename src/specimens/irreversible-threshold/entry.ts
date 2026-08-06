import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#12151a;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const irreversibleThreshold: Specimen = {
  id: 'irreversible-threshold',
  ref: 'SPX-1124',
  title: 'Irreversible Threshold',
  blurb:
    'PURGE // CACHE-04 climbs a fixed rail to a 65% COMMIT marker: CANCEL works through 64%, four brackets retract on crossing, then accelerated progress to PURGED.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired irreversible destruction threshold (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['threshold', 'progress', 'warning'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Cancel remains available before commit under prefers-reduced-motion or data-force-reduced-motion; post-commit progress may snap to PURGED without animated fill.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'Irreversible purge threshold',
  },
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; freeze the 65% COMMIT marker, progress ladder, hold 140ms, cross 90ms, and post-threshold 120/90/70ms.',
    'Wire runIrreversibleThreshold / cancelIrreversibleThreshold / resetIrreversibleThreshold.',
    'Disable CANCEL at or above 65% — never fake a post-commit cancel.',
    'Announce irreversibility via polite status; honour both reduced-motion triggers while preserving cancel-before-commit.',
  ],
  acceptance: [
    'COMMIT marker fixed at 65% before BEGIN',
    'CANCEL available 0–64%; disabled exactly at threshold',
    'Hold at 64% with approach indicator; cross 64→65 in ~90ms',
    'Exactly four CANCEL brackets retract on crossing',
    'Post-threshold accelerates 78→91→100; final PURGED with rail compress',
    'Pre-threshold CANCEL stops and returns toward 0 as CANCELLED',
    'Irreversibility readable without colour alone',
    'Reduced motion preserves cancel-before-commit semantics',
    'Progress values and timings frozen in contract.json',
  ],
}
