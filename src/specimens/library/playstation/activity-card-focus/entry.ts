import type { Specimen } from '../../../types'

export const activityCardFocus: Specimen = {
  id: 'activity-card-focus',
  ref: 'SPX-3308',
  title: 'Activity Card Focus',
  blurb: 'A selected activity card enlarges and exposes progress and actions without becoming a full page.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["activity","focus"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Focus and metadata appear instantly without scale transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 280,
    background: 'dark',
    scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Activity card focus',
  },
}
