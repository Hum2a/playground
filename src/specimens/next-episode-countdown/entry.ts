import type { Specimen } from '../types'

export const nextEpisodeCountdown: Specimen = {
  id: 'next-episode-countdown',
  ref: 'SPX-3184',
  title: 'Next Episode Countdown',
  blurb: "A timed next-episode handoff counts down then advances; CANCEL keeps the current end card.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["next-up","countdown"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Motion transitions are skipped; semantic end states remain available.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: 'Next Episode Countdown demo' },
}
