import type { Specimen } from '../../../types'

export const contextBackgroundCrossfade: Specimen = {
  id: 'context-background-crossfade',
  ref: 'SPX-3311',
  title: 'Context Background Crossfade',
  blurb:
    'Title-keyed ambient planes crossfade by opacity so focus changes never flash ink between contexts.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'transition', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['crossfade', 'context'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the active background plane snaps with no opacity transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 300,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Context background crossfade',
  },
  acceptance: [
    'Each of the three tiles activates a distinct title-keyed background plane.',
    'A→B (and B→C) crossfades opacity over 600ms without flashing ink.',
    'Context label matches the focused title.',
    'Reduced motion snaps the active plane with no opacity transition.',
  ],
}
