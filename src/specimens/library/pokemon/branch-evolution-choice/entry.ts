import type { Specimen } from '../../../types'
export const branchEvolutionChoice: Specimen = {
  id: 'branch-evolution-choice',
  ref: 'SPX-731',
  title: 'Branch Evolution Choice',
  blurb:
    'A shared stem grows into three structural futures; choose PERFORMANCE, BALANCED, or PORTABLE, then watch the current build travel the selected branch while others retract.',
  origin: {
    project: 'Original',
    surface: 'Pokémon-inspired branching evolution language (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['decision', 'branching', 'transformation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, branches appear immediately; selection snaps; Choose jumps to the final identity with no travel/retract choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 400,
    background: 'dark',

    label: 'Branch evolution choice',
  },

}
