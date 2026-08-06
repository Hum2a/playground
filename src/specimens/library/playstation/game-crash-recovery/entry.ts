import type { Specimen } from '../../../types'

export const gameCrashRecovery: Specimen = {
  id: 'game-crash-recovery',
  ref: 'SPX-3455',
  title: 'Game Crash Recovery',
  blurb: 'Active content collapses into an error report state with clear next actions — play surface folds into a crash dialog with retry and close.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired system UI motion (abstract)',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'playstation',
  },
  tags: ["crash","error","recovery"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, transitions and animations are removed; semantic end states remain.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 340,
    background: 'dark',
    label: 'Game Crash Recovery demo',
    scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  },
}
