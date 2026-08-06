import type { Specimen } from '../../../types'

export const oversizedRankNumeral: Specimen = {
  id: 'oversized-rank-numeral',
  ref: 'SPX-3232',
  title: "Oversized Rank Numeral",
  blurb: "Oversized Rank Numeral — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["rank","numeral"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Oversized Rank Numeral demo" },
}
