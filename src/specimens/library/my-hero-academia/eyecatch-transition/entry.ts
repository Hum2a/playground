import type { Specimen } from '../../../types'
export const eyecatchTransition: Specimen = {
  id: 'eyecatch-transition',
  ref: 'SPX-2218',
  title: 'Eyecatch Transition',
  blurb:
    'A diagonal-split eyecatch interstitial separates BEFORE SCENE and AFTER SCENE during a content swap.',
  origin: {
    project: 'Original',
    surface: 'Broadcast interstitial — branded wipe between major states',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['eyecatch', 'interstitial', 'wipe', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, scenes swap instantly with no interstitial panels.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    label: 'Eyecatch transition',
  },
}
