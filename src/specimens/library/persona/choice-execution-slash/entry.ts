import type { Specimen } from '../types'
export const choiceExecutionSlash: Specimen = {
  id: 'choice-execution-slash',
  ref: 'SPX-316',
  title: 'Choice execution slash',
  blurb:
    'A diagonal graphic slash confirms a choice: unselected options are cut away while the selected option survives and expands into a SELECTED state.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired decision-commit graphic language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['confirmation', 'selection'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Slash and alternative destruction are skipped; the final confirmed selection appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Choice confirmation',
  },

}
