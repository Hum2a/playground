import type { Specimen } from '../../../types'

export const activityExpandDetails: Specimen = {
  id: 'activity-expand-details',
  ref: 'SPX-3344',
  title: 'Activity Expand Details',
  blurb:
    'A compact objective card expands into tasks, rewards, and actions — a structured detail layout, not a taller shell.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['expand', 'details'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, expand and collapse snap with no transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 360,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Activity expand details',
  },
  acceptance: [
    'Expanded state reveals a 5-row task list, 2 reward chips, and 3 action chips.',
    'Compact state shows only title, status meta, and 2 / 5 count.',
    'Expansion is content reveal (opacity/transform), not a height bump alone.',
    'Reduced motion snaps expand and collapse with no transition.',
  ],
}
