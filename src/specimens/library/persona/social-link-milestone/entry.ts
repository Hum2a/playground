import type { Specimen } from '../../../types'

export const socialLinkMilestone: Specimen = {
  id: 'social-link-milestone',
  ref: 'SPX-2971',
  title: 'Social Link Milestone',
  blurb: 'Bond nodes converge onto a profile card and unlock a newly available capability badge.',
  origin: { project: 'Original', surface: 'Persona 4 — social links / bonds' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'persona', works: ['persona-4'] },
  tags: ['bond', 'milestone', 'converge'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Nodes rest near the card; unlock badge appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101010;display:grid;place-items:center;padding:0.75rem;">{{specimen}}</div>',
    label: 'Social link milestone',
  },
}
