import type { Specimen } from '../../../types'
export const capsuleDeploy: Specimen = {
  id: 'capsule-deploy',
  ref: 'SPX-1150',
  title: 'Capsule Deploy',
  blurb:
    'Stored API-07 extracts from bay 03, unseals through four decode lines, and constructively rebuilds into a healthy 280×180 service — mirror grammar of capsule-collapse.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired hardware object instantiation',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['deployment', 'instantiation', 'expansion', 'capsule'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, DEPLOY jumps to the full healthy service panel with rail VACANT.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 400,
    background: 'card',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;padding:1rem">{{specimen}}</div>',
    label: 'Hardware capsule service deployment',
  },
  integration: [
    'Share collapse hardware grammar: caps, seam, stamped API-07, dock bay.',
    'Keep exactly four decode lines and two reconstruction stages (100×74 then 280×180).',
    'Reveal metadata rows sequentially; rail finishes VACANT; support replay/restart.',
  ],
  acceptance: [
    'Stamped capsule extracts from storage with API-07 visible on band',
    'Four decode lines precede 100×74 then 280×180 reconstruction',
    'STATUS/REGION/LATENCY/WORKERS reveal at 45ms stagger; final metadata is healthy and static',
  ],
}
