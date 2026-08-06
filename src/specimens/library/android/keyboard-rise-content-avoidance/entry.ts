import type { Specimen } from '../../../types'
export const keyboardRiseContentAvoidance: Specimen = {
  id: 'keyboard-rise-content-avoidance',
  ref: 'SPX-1836',
  title: 'Keyboard Rise & Content Avoidance',
  blurb:
    '390×260 keyboard rises over 260ms; viewport reflows so focused input stays 16px above keys — bottom and top inputs behave differently.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired keyboard layout avoidance',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['keyboard', 'layout', 'focus'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, keyboard and layout reflow instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 390,
    height: 700,
    background: 'dark',

    label: 'Keyboard rise content avoidance',
  },

}
