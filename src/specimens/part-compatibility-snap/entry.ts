import type { Specimen } from '../types'
export const partCompatibilitySnap: Specimen = {
  id: 'part-compatibility-snap',
  ref: 'SPX-2086',
  title: 'Part Compatibility Snap',
  blurb:
    'MODULE-3 part is magnetically pulled toward SLOT A and locks in with compatibility confirmation.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia-inspired support-course part compatibility UI',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['snap', 'compatibility', 'magnetism', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, part jumps to snapped position in slot immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Part compatibility',
  },

}
