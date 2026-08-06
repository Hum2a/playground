import type { Specimen } from '../../../types'
export const sliderThumbPickup: Specimen = {
  id: 'slider-thumb-pickup',
  ref: 'SPX-1720',
  title: 'Slider Thumb Pickup',
  blurb:
    '280px range slider (0–100, step 5): thumb grows 20→28px on pickup; 44×32 bubble tracks thumb centre; fill follows value.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired slider precision feedback',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['slider', 'control', 'drag'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, thumb and bubble state switch instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 220,
    background: 'card',

    label: 'Slider thumb pickup',
  },

}
