import type { Specimen } from '../types'

export const skipIntroAppear: Specimen = {
  id: 'skip-intro-appear',
  ref: 'SPX-3178',
  title: 'Skip Intro Appear',
  blurb: "During a skippable intro window a SKIP INTRO control fades in; outside that window it is gone.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["skip","contextual"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Motion transitions are skipped; semantic end states remain available.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: 'Skip Intro Appear demo' },
}
