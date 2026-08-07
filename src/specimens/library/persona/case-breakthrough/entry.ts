
import type { Specimen } from '../../../types'

export const caseBreakthrough: Specimen = {
  id: 'case-breakthrough',
  ref: 'SPX-2949',
  title: 'Case Breakthrough',
  blurb: 'A chaotic evidence board reorganises into a solved relationship graph.',
  origin: {
    project: 'Original',
    surface: 'Persona 4 investigation / mystery visual language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['investigation', 'graph', 'reorganise'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Board jumps instantly to solved graph layout under both reduced-motion triggers.',
  },
  acceptance: [
    'SOLVE reorganises nodes (680ms) then draws links (520ms)',
    'Visible status announces solved / scattered',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 280,
    background: 'dark',
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2a2a2a;border-radius:2px;background:#101010;">
  {{specimen}}
</div>`,
    label: 'Case breakthrough board',
  },
}
