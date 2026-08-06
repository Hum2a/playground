import type { Specimen } from '../../../types'
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
  loadPayload:()=>import('./payload').then((m)=>m.default),
  preview: { width: 380, height: 420, background: 'card', label: 'Sector target search (demo)' },

}
