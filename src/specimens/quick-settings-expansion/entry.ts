import type { Specimen } from '../types'
export const quickSettingsExpansion: Specimen = {
  id: 'quick-settings-expansion',
  ref: 'SPX-1648',
  title: 'Quick Settings Expansion',
  blurb:
    '360×96 compact strip morphs to 360×330 panel over 360ms — first four controls reposition into 2×3 grid; extras fade after 45% progress.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired quick settings expansion',
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
  tags: ['quick-settings', 'grid', 'container-transform'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate geometry switch.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 400,
    background: 'dark',

    label: 'Quick settings expansion',
  },

}
