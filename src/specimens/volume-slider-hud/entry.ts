import type { Specimen } from '../types'
export const volumeSliderHud: Specimen = {
  id: 'volume-slider-hud',
  ref: 'SPX-1848',
  title: 'Volume Slider HUD',
  blurb:
    '72×280 transient HUD from translateX(90px) over 220ms; vertical track 0–100 in 10-point steps; mute at 0; expands to 240px with three sliders.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired volume HUD arrival',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['system-hud', 'slider', 'temporary'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, HUD appears in place.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 390,
    height: 420,
    background: 'dark',

    label: 'Volume slider HUD',
  },

}
