import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#e7e4dc;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>`

export const sectorRadarSearch: Specimen = {
  id: 'sector-radar-search',
  ref: 'SPX-1060',
  title: 'Sector Radar Search',
  blurb: 'An original REGION // 12 instrument completes two finite sweeps: four fixed candidates compare at .31/.46/.58/.92, then Node D locks at distance 2.4.',
  origin: { project: 'Original', surface: 'Dragon Ball-inspired spatial search / target lock' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'dragonball' },
  tags: ['search', 'radar', 'discovery', 'target-lock'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'All four signals and Node D lock appear immediately.' },
  files: { html, css, js }, spec, contract,
  preview: { width: 380, height: 420, background: 'card', scaffold, label: 'Sector target search (demo)' },
  integration: [
    'Preserve all four coordinates, strengths, and the two 1200ms sweep maximum.',
    'Keep four D brackets and three triangulation lines; no continuing radar loop.',
    'Expose target Node D and distance 2.4 in text; reduced motion is immediate final state.',
  ],
  acceptance: [
    'Exactly four fixed candidates and two sweep rotations maximum',
    'First rotation reaches exactly four signals with deterministic strengths',
    'D (.92) locks in the second rotation with four brackets and three lines',
    'Final state is static with target and distance text',
  ],
}
