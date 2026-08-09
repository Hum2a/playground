import type { Specimen } from '../../../types'
export const inputFocusAttack: Specimen = {
  id: 'input-focus-attack',
  ref: 'SPX-144',
  title: 'Input focus attack',
  blurb:
    'Four angular brackets converge onto a text input the instant it is focused, with a red underline shooting in beneath it.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['form', 'focus-state', 'brackets'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Bracket converge/retract and underline sweep are removed under prefers-reduced-motion or data-force-reduced-motion; brackets and underline still appear/disappear on focus instantly, and the border colour flip communicates focus on its own.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 200,
    background: 'card',
    label: 'Codename field',
  },
}
