import type { Specimen } from '../../../types'
export const championResolution: Specimen = {
  id: 'champion-resolution',
  ref: 'SPX-1147',
  title: 'Champion Resolution',
  blurb:
    'MODEL ARENA // 08 finalises ATLAS 92 over NOVA 87: margin +05, eight structural rays, six historical paths, and a canonical CHAMPION stamp — no confetti.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired World Tournament champion resolution (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['result', 'selection', 'completion'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, FINALISE immediately shows the champion composition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 460,
    background: 'dark',

    label: 'Champion resolution demo',
  },

}
