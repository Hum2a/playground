import type { Specimen } from '../types'

export const socialLinkMilestone: Specimen = {
  id: 'social-link-milestone',
  ref: 'SPX-2971',
  title: 'Social Link Milestone',
  blurb: 'Bond nodes orbit a profile card and converge into a newly unlocked capability badge.',
  origin: { project: 'Original', surface: 'Persona 4 — social links / bonds' },
  facets: { kind: 'loop', tech: 'css-only', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ["bond","milestone","converge"],
  deps: 'none',
  motion: { loops: true, respectsReducedMotion: true, reducedMotionNote: 'Nodes rest near the card; unlock badge stays visible with no orbit motion.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'dark', label: 'Social link milestone' },
}
