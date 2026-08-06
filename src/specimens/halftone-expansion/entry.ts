import type { Specimen } from '../types'
export const halftoneExpansion: Specimen = {
  id: 'halftone-expansion',
  ref: 'SPX-1981',
  title: 'Halftone Expansion',
  blurb:
    'Halftone dots expand from the trigger point as a transition mask while swapping between two content states.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia-inspired comic/anime action language',
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
  tags: ['halftone', 'mask', 'expansion', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, content swaps instantly with no halftone expansion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',

    label: 'Halftone expansion',
  },
  integration: [
    'Mount inside a relative overflow-hidden viewport.',
    'Import demo.css verbatim; origin is set from trigger click position.',
    'Swap content while mask is fully expanded (~220ms).',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Activate expands halftone mask from button origin and swaps to COMPLETE',
    'Mask remains clipped to specimen bounds',
    'Reset returns to STANDBY via restart message or Reset button',
    'Reduced motion swaps states without mask travel',
  ],
}
