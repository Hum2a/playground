import type { Specimen } from '../../../types'

export const glassBadgeAssembly: Specimen = {
  id: 'glass-badge-assembly',
  ref: 'SPX-434',
  title: 'Glass Badge Assembly',
  blurb:
    'Nine deterministic glass fragments converge into a cool-blue Persona 3–inspired badge, then hold as a readable assembled mark.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired glass interface assembly',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['glass', 'badge', 'fragments', 'assemble'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'All nine fragments immediately form the badge while the ASSEMBLED label remains visible under either reduced-motion trigger.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 300,
    background: 'dark',
    label: 'Glass badge assembly',
  },
}
