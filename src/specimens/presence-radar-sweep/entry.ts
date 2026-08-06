import type { Specimen } from '../types'

export const presenceRadarSweep: Specimen = {
  id: 'presence-radar-sweep',
  ref: 'SPX-2509',
  title: 'Presence Radar Sweep',
  blurb:
    'A finite radial sweep arcs once across a radar screen, logging three fixed presence blips into a contact list as it crosses them.',
  origin: {
    project: 'Original',
    surface: 'Naruto / sensory-detection interfaces — presence tracking overlays',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['radar'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all three blips appear logged immediately with the sweep beam parked at rest.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Presence radar sweep',
  },
}
