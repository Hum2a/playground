import type { Specimen } from '../types'
export const matchStartSlam: Specimen = {
  id: 'match-start-slam',
  ref: 'SPX-2040',
  title: 'Match Start Slam',
  blurb:
    'Giant START treatment slams over the viewport, holds briefly, then tears away diagonally to reveal the live match panel beneath.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired tournament match start UI (abstract)',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['match', 'slam', 'tear'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, overlay is skipped and MATCH LIVE panel appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 380,
    background: 'dark',

    label: 'Match start slam',
  },

}
