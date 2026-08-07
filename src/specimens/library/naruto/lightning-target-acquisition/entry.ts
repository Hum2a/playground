import type { Specimen } from '../../../types'

export const lightningTargetAcquisition: Specimen = {
  id: 'lightning-target-acquisition',
  ref: 'SPX-2464',
  title: 'Lightning Target Acquisition',
  blurb:
    'A reticle snaps from [-92,-58] in 440ms while three branch-bolts (18°/−24°/8°) flicker, then LOCKED — abstract graphic lightning.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — lightning-style target lock',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['targeting', 'lock-on', 'acquisition', 'bolt'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the reticle resolves directly to LOCKED with no snap/flicker choreography.',
  },
  acceptance: [
    'Branch-bolts at 18/−24/8° flicker before LOCKED',
    'Snap from [-92,-58] in 440ms then settle 150ms',
    'Reduced motion shows LOCKED immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Lightning target acquisition',
  },
}
