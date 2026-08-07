import type { Specimen } from '../../../types'

export const controlCenterRise: Specimen = {
  id: 'control-center-rise',
  ref: 'SPX-3307',
  title: 'Control Center Rise',
  blurb:
    'Home control strip rises over a layered game plane — five labeled slots, soft top-edge bloom, game blurs but stays present.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired home / control center language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'playstation',
    works: ['ps5'],
  },
  tags: ['control-center', 'strip'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, strip position and game blur snap instantly — no 420ms rise.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Control center rise',
  },
}
