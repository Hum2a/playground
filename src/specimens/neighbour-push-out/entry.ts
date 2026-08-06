import type { Specimen } from '../types'

export const neighbourPushOut: Specimen = {
  id: 'neighbour-push-out',
  ref: 'SPX-3147',
  title: 'Neighbour Push-Out',
  blurb: "Adjacent cards translate away from an expanding selection while keeping their size — room is made without shrinking neighbours.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["preview","layout"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Motion transitions are skipped; semantic end states remain available.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: 'Neighbour Push-Out demo' },
}
