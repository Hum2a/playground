import type { Specimen } from '../../../types'

export const resumePlaybackHandoff: Specimen = {
  id: 'resume-playback-handoff',
  ref: 'SPX-3226',
  title: "Resume Playback Handoff",
  blurb: "Resume Playback Handoff — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["resume","handoff"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Resume Playback Handoff demo" },
}
