import type { Specimen } from '../../../types'

export const activityCardFocus: Specimen = {
  id: 'activity-card-focus',
  ref: 'SPX-3308',
  title: 'Activity Card Focus',
  blurb:
    'A selected activity card enlarges and exposes a progress chip, fill bar, and secondary actions without becoming a full page.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['activity', 'focus', 'progress'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, card scale, meta, and action chips snap with no transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 280,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Activity card focus',
  },
  acceptance: [
    'Exactly one activity card is focused at a time.',
    'Focused card grows to scale 1.06 / flex 1.35 and shows its progress percent chip + fill bar.',
    'Focused card reveals RESUME and INFO secondary chips.',
    'Reduced motion applies focus, progress, and chips instantly with no transition.',
  ],
}
