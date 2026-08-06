import type { Specimen } from '../types'

export const focusModeActivation: Specimen = {
  id: 'focus-mode-activation',
  ref: 'SPX-2488',
  title: 'Focus Mode Activation',
  blurb:
    'Four corner brackets converge on a central reticle while peripheral content dims, narrowing the view into a high-contrast analysis mode — abstract graphic vision mode, no copyrighted iconography.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — heightened-vision focus modes',
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
  tags: ['focus', 'brackets', 'analysis'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, focus mode activates directly with no bracket convergence or dimming transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Focus mode activation',
  },
}
