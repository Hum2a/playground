import type { Specimen } from '../types'

export const cinematicRibbonReveal: Specimen = {
  id: 'cinematic-ribbon-reveal',
  ref: 'SPX-3110',
  title: "Cinematic Ribbon Reveal",
  blurb: "Cinematic Ribbon Reveal — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["cinematic","reveal"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Cinematic Ribbon Reveal demo" },
}
