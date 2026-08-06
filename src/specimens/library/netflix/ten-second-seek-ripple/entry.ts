import type { Specimen } from '../../../types'

export const tenSecondSeekRipple: Specimen = {
  id: 'ten-second-seek-ripple',
  ref: 'SPX-3163',
  title: "Ten-Second Seek Ripple",
  blurb: "Ten-Second Seek Ripple — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["playback","seek"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Ten-Second Seek Ripple demo" },
}
