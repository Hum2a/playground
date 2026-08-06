import type { Specimen } from '../types'
export const nearbyDeviceDiscovery: Specimen = {
  id: 'nearby-device-discovery',
  ref: 'SPX-1866',
  title: 'Nearby Device Discovery',
  blurb:
    'DISCOVER reveals four fixed radial recipient nodes at 120ms intervals; orbit rings draw once; NODE C becomes ready after 900ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired nearby sharing discovery',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['nearby', 'discovery', 'transfer'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all recipients appear immediately in final positions.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 480,
    background: 'dark',

    label: 'Nearby device discovery',
  },

}
