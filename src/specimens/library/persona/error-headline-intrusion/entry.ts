import type { Specimen } from '../../../types'

export const errorHeadlineIntrusion: Specimen = {
  id: 'error-headline-intrusion',
  ref: 'SPX-153',
  title: 'Error Headline Intrusion',
  blurb:
    'A giant decorative ERROR slides in behind a contact form while the card recoils once and semantic field errors settle.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired editorial form rejection',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['form', 'validation', 'alert'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'ERROR headline appears in its final position immediately with no slide or form recoil under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 620,
    height: 420,
    background: 'dark',
    label: 'Error headline intrusion',
  },
}
