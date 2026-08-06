import type { Specimen } from '../../../types'

export const contextBackgroundCrossfade: Specimen = {
  id: 'context-background-crossfade',
  ref: 'SPX-3311',
  title: 'Context Background Crossfade',
  blurb: 'The ambient background crossfades smoothly as focus moves between titles.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'transition', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["crossfade","context"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Active layer swaps instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 300,
    background: 'dark',
    scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Context background crossfade',
  },
}
