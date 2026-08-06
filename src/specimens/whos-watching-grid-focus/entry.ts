import type { Specimen } from '../types'

export const whosWatchingGridFocus: Specimen = {
  id: 'whos-watching-grid-focus',
  ref: 'SPX-3118',
  title: "Who's Watching Grid Focus",
  blurb: "Who's Watching Grid Focus — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["profile","focus"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Who's Watching Grid Focus demo" },
}
