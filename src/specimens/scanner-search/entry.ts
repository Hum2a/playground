import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#020b15;">
  {{specimen}}
</div>
`.trim()

export const scannerSearch: Specimen = {
  id: 'scanner-search',
  ref: 'SPX-604',
  title: 'Scanner Search',
  blurb:
    'A pale scanline walks a fixed dataset; rows classify only as it reaches them — matches gain brackets and a rule, non-matches subdue then collapse into a quiet result count.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 SEES / analysis–inspired local search filter',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['search', 'filter', 'scan', 'hud'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Scanline travel and per-row classification motion are skipped under prefers-reduced-motion or data-force-reduced-motion; the filtered list and count appear immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 380,
    background: 'dark',
    scaffold,
    label: 'Scanner search demo',
  },
  integration: [
    'Mount inside a relative overflow-hidden frame.',
    'Keep the static six-row dataset local — no network.',
    'Import demo.css verbatim; preserve 650ms scan, 80ms hold, 180ms collapse.',
    'Call runScannerSearch / runScannerClear; lock the query for the scan duration.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate filtered state.',
  ],
  acceptance: [
    'Search classifies the local dataset with case-insensitive substring match; no network',
    'Scanline moves through rows; each row classifies only when the line reaches it',
    'Matches gain left rule, brackets, and MATCH; non-matches subdue then collapse after scan',
    'Result count appears last; zero matches show NO MATCH with broken blue line',
    'CLEAR restores all rows; reduced motion filters immediately',
    'Exact scan duration and row timing documented',
  ],
}
