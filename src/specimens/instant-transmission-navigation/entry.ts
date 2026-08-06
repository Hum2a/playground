import type { Specimen } from '../types'
export const instantTransmissionNavigation: Specimen = {
  id: 'instant-transmission-navigation',
  ref: 'SPX-1011',
  title: 'Instant Transmission Navigation',
  blurb:
    'SESSION // 04 locks REGION // B, collapses at A with residual fragments, vanishes for a short empty gap, then reconstructs at B — zero-distance relocation, never travelling the space between.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired Instant Transmission navigation language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['navigation', 'teleport', 'relocation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, SESSION // 04 appears immediately at B with A vacant.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 340,
    background: 'dark',

    label: 'Instant transmission navigation',
  },

}
