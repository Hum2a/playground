import type { Specimen } from '../../../types'

export const cardCollapseReturn: Specimen = {
  id: 'card-collapse-return',
  ref: 'SPX-3383',
  title: 'Card Collapse Return',
  blurb:
    'Expanded tile reconstructs its exact original 96×132 rail geometry on return.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI motion (abstract)' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['collapse', 'return'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, expand and collapse snap to original 96×132 bounds.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 480,
    height: 260,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
    label: 'Card Collapse Return demo',
  },
  acceptance: [
    'Expand lifts one tile by 16px at scale 1.26 and shows RETURN; siblings disable.',
    'Second activate collapses to exact original 96×132 rail geometry.',
    'Collapse travel is 200ms with transform-origin bottom center.',
    'Reduced motion snaps expand and return to original bounds with no transition.',
  ],
}
