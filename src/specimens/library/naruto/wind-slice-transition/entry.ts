import type { Specimen } from '../../../types'

export const windSliceTransition: Specimen = {
  id: 'wind-slice-transition',
  ref: 'SPX-2458',
  title: 'Wind Slice Transition',
  blurb:
    'Four staggered diagonal blades sweep across the stage, exchanging content mid-sweep — abstract graphic cuts, no copyrighted iconography.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — wind-style slice transitions',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['wipe', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the state swaps immediately with no blade sweep.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Wind slice transition',
  },
}
