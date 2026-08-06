import type { Specimen } from '../types'

export const skipIntroCommit: Specimen = {
  id: 'skip-intro-commit',
  ref: 'SPX-3179',
  title: "Skip Intro Commit",
  blurb: "Skip Intro Commit — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["skip","commit"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Skip Intro Commit demo" },
}
