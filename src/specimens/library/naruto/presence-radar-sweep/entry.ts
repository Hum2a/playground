import type { Specimen } from '../../../types'

export const presenceRadarSweep: Specimen = {
  id: 'presence-radar-sweep',
  ref: 'SPX-2509',
  title: 'Presence Radar Sweep',
  blurb:
    'A finite radar sweep logs three frozen presence blips at fixed coords and bearings into COMPLETE.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, all three contacts appear COMPLETE immediately.',
  },
    acceptance: [
    'Sweep arcs once; three blips at frozen coords (57.6,49.3), (111.5,35), (154.1,62.1)',
    'Contacts log in bearing order 042° → 090° → 138°',
    'Resolved shows COMPLETE with all three contacts active',
    'Replay clears blips/log before rerunning',
    'Reduced motion shows all contacts COMPLETE immediately',
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
