import type { Specimen } from '../../../types'

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
  acceptance: [
    'Blips at frozen bearings appear as sweep crosses them',
    'Contact log lists bearings; sweep rests when done',
    'Reduced motion shows blips logged with beam at rest',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#070b0e;display:grid;place-items:center;padding:0.75rem;">{{specimen}}</div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Presence radar sweep',
  },
}
