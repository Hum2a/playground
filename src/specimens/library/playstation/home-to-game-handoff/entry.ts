import type { Specimen } from '../../../types'

export const homeToGameHandoff: Specimen = {
  id: 'home-to-game-handoff',
  ref: 'SPX-3315',
  title: 'Home-to-Game Handoff',
  blurb: 'Selecting a title expands its identity before transitioning into a launch-ready state.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'transition', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["launch","handoff"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Launch state appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',
    scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Home-to-game handoff',
  },
}
