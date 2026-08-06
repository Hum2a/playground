import type { Specimen } from '../../../types'

export const verticalLightBarIntro: Specimen = {
  id: 'vertical-light-bar-intro',
  ref: 'SPX-3111',
  title: "Vertical Light-Bar Intro",
  blurb: "Vertical Light-Bar Intro — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["cinematic","intro"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Vertical Light-Bar Intro demo" },
}
