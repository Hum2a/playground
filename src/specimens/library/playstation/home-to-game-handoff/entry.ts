import type { Specimen } from '../../../types'

export const homeToGameHandoff: Specimen = {
  id: 'home-to-game-handoff',
  ref: 'SPX-3315',
  title: 'Home-to-Game Handoff',
  blurb:
    'SELECT expands a home tile spatially, then hands off into a LAUNCHING surface.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'transition', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['launch', 'handoff'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, rail/tile/launch transitions are killed and JS jumps straight to launch.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Home-to-game handoff',
  },
  acceptance: [
    'SELECT runs idle → select → expand → launch; launch shows LAUNCHING.',
    'Expand uses scale 1.35 and 12px lift before the 520ms handoff.',
    'RESET returns to the idle home rail.',
    'Reduced motion kills rail/tile/launch transitions and jumps to launch with no expand delay.',
  ],
}
