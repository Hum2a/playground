import type { Specimen } from '../../../types'

export const trophyUnlockPop: Specimen = {
  id: 'trophy-unlock-pop',
  ref: 'SPX-3347',
  title: 'Trophy Unlock Pop',
  blurb:
    'A compact achievement toast enters, shines once, and settles through frozen phases.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'overlay', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['trophy', 'notification'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the settled toast appears with no enter/shine animation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 300,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Trophy unlock pop',
  },
  acceptance: [
    'Unlock plays phases enter (320ms) → shine (480ms) → settled (200ms).',
    'Shine sweeps exactly once, then the toast holds with a settled border.',
    'Status announces the active toast phase.',
    'Reduced motion jumps to the settled toast with no enter/shine animation.',
  ],
}
