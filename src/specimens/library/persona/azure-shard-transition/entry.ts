import type { Specimen } from '../types'
export const azureShardTransition: Specimen = {
  id: 'azure-shard-transition',
  ref: 'SPX-005',
  title: 'Blue Glass Shard Transition',
  blurb:
    'Seven major translucent blue glass panes and two accent slivers sweep the host, obscure via overlapping geometry, swap MIDNIGHT→DARK HOUR under full coverage, then continue their trajectories — cool P3 Reload language, original CSS only.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Reload–inspired cool blue glass / refraction transition',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['glass', 'refraction'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Pane travel is skipped under prefers-reduced-motion or data-force-reduced-motion; content swaps immediately with an optional static diagonal glass accent — no scale.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Blue glass page transition',
  },


}
