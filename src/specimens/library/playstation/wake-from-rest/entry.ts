import type { Specimen } from '../../../types'

export const wakeFromRest: Specimen = {
  id: 'wake-from-rest',
  ref: 'SPX-3436',
  title: 'Wake from Rest',
  blurb:
    'Black rest veil lifts (700ms) over a framed home shelf with focus intact — inverse of Rest Mode Dim, not a focus-restore brighten.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired system UI motion (abstract)',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'playstation',
    works: ['ps5'],
  },
  tags: ['wake', 'rest', 'focus'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, veil lift transitions are removed; awake end state remains.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 320,
    background: 'dark',
    label: 'Wake from Rest demo',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  },
}
