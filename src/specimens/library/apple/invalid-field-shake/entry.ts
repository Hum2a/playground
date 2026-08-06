import type { Specimen } from '../../../types'
export const invalidFieldShake: Specimen = {
  id: 'invalid-field-shake',
  ref: 'SPX-1530',
  title: 'Invalid Field Shake',
  blurb:
    'PROJECT CODE field refuses invalid ORBIT? with exact finite shake offsets, inline error expansion, and success tick on ORBIT-7.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired validation refusal',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['validation', 'shake', 'form'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, no shake — error boundary and message appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 260,
    background: 'dark',

    label: 'Invalid field shake',
  },

}
