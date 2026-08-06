import type { Specimen } from '../../../types'
export const heroNameSlam: Specimen = {
  id: 'hero-name-slam',
  ref: 'SPX-1987',
  title: 'Hero Name Slam',
  blurb:
    'Codename UNIT 07 slams into frame with angular accent brackets and role copy settling to OUTPUT // ASSIGNED.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired hero-name title card language',
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
  tags: ['title-card', 'slam', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, name and brackets appear immediately in final pose.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 320,
    background: 'dark',

    label: 'Hero name slam',
  },

}
