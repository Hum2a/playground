import type { Specimen } from '../../../types'
export const blueFocusBrackets: Specimen = {
  id: 'blue-focus-brackets',
  ref: 'SPX-567',
  title: 'Blue focus brackets',
  blurb:
    'Four angular pale-blue corner brackets mark keyboard focus on interactive controls — focus only, never conflated with hover or selection.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired SEES / glass navigation focus language',
  },
  facets: {
    kind: 'interaction',
    tech: 'css-only',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3', 'persona-3-reload'],
  },
  tags: ['focus', 'keyboard', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Brackets appear immediately at their final inset; no inward travel animation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 240,
    background: 'dark',

    label: 'Keyboard focus',
  },

}
