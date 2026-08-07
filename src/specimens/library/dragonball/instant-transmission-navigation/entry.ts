import type { Specimen } from '../../../types'
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
  integration: [
    'Mount in a relative overflow-clipped host (~420×200+).',
    'Call transmitInstantNav() / resetInstantNav(); keep vacant-A / occupied-B end state.',
    'Honour both reduced-motion triggers with immediate B placement.',
  ],
  acceptance: [
    'Idle: session only in REGION A; B empty',
    'Complete: A VACANT; B holds SESSION // 04',
    'No travel path across the gap — only the empty teleport window',
    'Reduced motion: immediate vacant A + occupied B',
  ],
}
