import type { Specimen } from '../types'
export const impactFrameSlam: Specimen = {
  id: 'impact-frame-slam',
  ref: 'SPX-1975',
  title: 'Impact Frame Slam',
  blurb:
    'A halftone impact flash and angular slam swap STANDBY to ALERT inside a clipped comic panel with corner wedges.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired impact-frame / action feedback language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['impact', 'comic', 'feedback'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, ALERT appears immediately with static wedges and no flash or slam.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',

    label: 'Impact frame slam',
  },

}
