import type { Specimen } from '../types'
export const fadeThrough: Specimen = {
  id: 'fade-through',
  ref: 'SPX-1577',
  title: 'Fade Through',
  blurb:
    'Two-phase 300ms content swap: outgoing fades 0–105ms, incoming 105–300ms; outer container stays fixed; no full-opacity overlap.',
  origin: {
    project: 'Original',
    surface: 'Android Material fade-through transition',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['fade-through', 'content-swap'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Instantaneous content replacement or ≤80ms opacity-only handoff.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 420,
    background: 'dark',

    label: 'Fade through transition',
  },

}
