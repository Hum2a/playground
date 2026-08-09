import type { Specimen } from '../../../types'

export const passwordRevealCutout: Specimen = {
  id: 'password-reveal-cutout',
  ref: 'SPX-151',
  title: 'Password Reveal Cutout',
  blurb:
    'A dark jagged mask tears off a real password field to expose characters; HIDE slams the cutout back from the right.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired editorial disclosure language',
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
  tags: ['reveal', 'tear', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Mask and input type swap instantly under prefers-reduced-motion or data-force-reduced-motion; no tear travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 520,
    height: 240,
    background: 'dark',
    label: 'Password reveal cutout',
  },
}
