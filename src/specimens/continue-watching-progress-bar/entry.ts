import type { Specimen } from '../types'

export const continueWatchingProgressBar: Specimen = {
  id: 'continue-watching-progress-bar',
  ref: 'SPX-3227',
  title: "Continue-Watching Progress Bar",
  blurb: "Continue-Watching Progress Bar — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["progress","continue"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Continue-Watching Progress Bar demo" },
}
