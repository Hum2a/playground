import type { Specimen } from '../types'
export const buttonImpactShockwave: Specimen = {
  id: 'button-impact-shockwave',
  ref: 'SPX-2118',
  title: 'Button Impact Shockwave',
  blurb:
    'High-priority Activate sends one angular shockwave through its parent card on impact.',
  origin: {
    project: 'Original',
    surface: 'anime/comic action language study',
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
  tags: ['button', 'shockwave', 'impact', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, COMPLETE appears immediately without wave or card nudge.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'card',

    label: 'Priority card',
  },
  integration: [
    'Mount card in relative overflow-hidden host.',
    'Shockwave 660ms from button origin; total 1310ms.',
    'Wire Activate / Replay; harness restart support.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Activate fires one hex shockwave through card',
    'Card nudges once on impact',
    'COMPLETE label visible at end',
    'Replay resets to idle',
    'Reduced motion: instant COMPLETE',
  ],
}
