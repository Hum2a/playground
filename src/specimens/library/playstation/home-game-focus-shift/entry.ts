import type { Specimen } from '../types'

export const homeGameFocusShift: Specimen = {
  id: 'home-game-focus-shift',
  ref: 'SPX-3309',
  title: 'Home Game Focus Shift',
  blurb: 'Moving between game tiles changes the ambient background while navigation continuity is preserved.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["home","focus"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Background swaps instantly without crossfade.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 300,
    background: 'dark',
    scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Home game focus shift',
  },
}
