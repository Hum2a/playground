import type { Specimen } from '../types'

export const profileAvatarSelectSnap: Specimen = {
  id: 'profile-avatar-select-snap',
  ref: 'SPX-3119',
  title: "Profile Avatar Select Snap",
  blurb: "Profile Avatar Select Snap — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["profile","select"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Profile Avatar Select Snap demo" },
}
