import type { Specimen } from '../types'
export const discoveryTearOpen: Specimen = {
  id: 'discovery-tear-open',
  ref: 'SPX-322',
  title: 'Discovery Tear-Open',
  blurb:
    'A mostly intact paper surface hides a secret behind a torn corner; tearing it open splits the sheet into three residual flaps.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired paper / collage discovery language',
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
  tags: ['discovery', 'reveal', 'tear'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Lift, tear growth, and flap travel are skipped under prefers-reduced-motion or data-force-reduced-motion; the final torn-open composition and available secret appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',

    label: 'Discovery tear surface',
  },

}
