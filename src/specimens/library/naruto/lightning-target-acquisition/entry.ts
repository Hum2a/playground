import type { Specimen } from '../../../types'

export const lightningTargetAcquisition: Specimen = {
  id: 'lightning-target-acquisition',
  ref: 'SPX-2464',
  title: 'Lightning Target Acquisition',
  blurb:
    'A loose reticle snaps onto a target with brief branching marks at the corners, then locks solid — abstract graphic lightning, no copyrighted iconography.',
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
  tags: ['targeting', 'lock-on', 'acquisition'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the reticle resolves directly to LOCKED with no snap/flicker choreography.',
  },
  acceptance: [
    'Branch-bolt reticle acquires then LOCKED',
    'Branch geometry frozen in contract',
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
