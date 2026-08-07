import type { Specimen } from '../../../types'

export const presenceRadarSweep: Specimen = {
  id: 'presence-radar-sweep',
  ref: 'SPX-2509',
  title: 'Presence Radar Sweep',
  blurb:
    'A finite -70°→70° phosphor sweep logs three presence blips at -40°/10°/55° then rests.',
  origin: {
    project: 'Original',
    surface: 'Naruto / sensory detection — presence radar',
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
  tags: ["radar","sweep","presence"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved Presence Radar Sweep state appears immediately.',
  },
  acceptance: [
    'Sweep arcs from -70° to 70° once; blips at bearings [-40,10,55] log as crossed',
    'Contact log lists all three bearings; beam rests after settleMs 110',
    'Replay clears log and parks beam at start before rerunning',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#070B0E;display:grid;place-items:center;padding:0.75rem;">{{specimen}}</div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Presence Radar Sweep',
  },
}
