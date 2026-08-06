import type { Specimen } from '../../../types'
export const tartarusFloorAscension: Specimen = {
  id: 'tartarus-floor-ascension',
  ref: 'SPX-468',
  title: 'Tartarus Floor Ascension',
  blurb:
    'Stacked architectural floor slabs ascend: the current rises past the viewer while the next locks in from below.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired Tartarus vertical progression language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['progress', 'navigation', 'vertical'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Vertical travel is skipped under prefers-reduced-motion or data-force-reduced-motion; the active floor and stack positions update immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Tartarus floor stack',
  },

}
