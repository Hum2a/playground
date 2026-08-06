import type { Specimen } from '../../../types'

export const bossIntroductionFreeze: Specimen = {
  id: 'boss-introduction-freeze',
  ref: 'SPX-2967',
  title: 'Boss Introduction Freeze',
  blurb:
    'The interface freezes while an oversized threat identity card cuts across the viewport.',
  origin: { project: 'Specimen Archive', surface: 'Persona 4–inspired motion language' },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ["boss","freeze","intro","confrontation"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Boss card appears immediately in final pose under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Boss intro',
  },
}
