import type { Specimen } from '../../../types'
export const ripplePortalTransition: Specimen = {
  id: 'ripple-portal-transition',
  ref: 'SPX-406',
  title: 'Ripple Portal Transition',
  blurb:
    'A pale disturbance blooms at a fixed off-centre origin; three ripples expand while a circular portal reveals depth that already waits inside the growing radius.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 water / depth–inspired radial portal',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['ripple', 'radial-reveal', 'liquid'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Ripple expansion and radial reveal are skipped under prefers-reduced-motion or data-force-reduced-motion; State B appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Ripple portal demo',
  },

}
