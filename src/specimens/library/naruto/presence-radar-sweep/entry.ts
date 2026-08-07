import type { Specimen } from '../../../types'

export const presenceRadarSweep: Specimen = {
  id: 'presence-radar-sweep',
  ref: 'SPX-2509',
  title: 'Presence Radar Sweep',
  blurb:
    'A phosphor radar sweeps once (570ms) logging three frozen presence blips.',
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
  tags: ['radar', 'sweep', 'presence'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all three blips appear COMPLETE immediately.',
  },
  acceptance: [
    'Sweep duration frozen at sweepMs 570 across three blip steps',
    'Blip coordinates frozen: (57.6,49.3), (111.5,35), (154.1,62.1)',
    'Contact log lists all three bearings; beam rests after settleMs 110',
    'Phosphor palette; blips latch by scale, not opacity-only',
    'Reduced motion shows COMPLETE with all blips immediately',
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
