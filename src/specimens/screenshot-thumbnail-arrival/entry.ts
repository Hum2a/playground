import type { Specimen } from '../types'
export const screenshotThumbnailArrival: Specimen = {
  id: 'screenshot-thumbnail-arrival',
  ref: 'SPX-1940',
  title: 'Screenshot Thumbnail Arrival',
  blurb:
    'Capture flashes 70ms, then a 116×206 miniature thumbnail arrives bottom-left over 300ms; dwell 4200ms; tap opens editor and pauses timeout.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired screenshot thumbnail chip',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['screenshot', 'thumbnail', 'temporary-surface'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, omit flash and travel; thumbnail appears in place.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 390,
    height: 500,
    background: 'dark',

    label: 'Screenshot thumbnail arrival',
  },

}
