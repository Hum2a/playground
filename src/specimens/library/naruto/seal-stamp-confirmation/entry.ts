import type { Specimen } from '../../../types'

export const sealStampConfirmation: Specimen = {
  id: 'seal-stamp-confirmation',
  ref: 'SPX-2379',
  title: 'Seal Stamp Confirmation',
  blurb:
    'A stamp descends and strikes a document in one decisive motion, leaving a single ink seal mark as the confirmation.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction mission-filing language — one-stamp confirmation',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['stamp', 'confirmation', 'impact'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the stamp appears already struck with the ink mark visible; no descent or impact plays.',
  },
  acceptance: [
    'Stamp overshoots then settles to a frozen angle',
    'Confirmation ring pulses exactly once',
    'Reduced motion shows settled stamp immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#140c0c;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,300px);min-height:180px;border:1px solid #3a2820;background:#e8dcc8;padding:1.25rem;color:#140c0c;font:700 13px ui-serif,Georgia,serif;">Permit draft{{specimen}}</div></div>`,
    width: 340,
    height: 320,
    background: 'dark',
    label: 'Seal stamp confirmation',
  },
}
