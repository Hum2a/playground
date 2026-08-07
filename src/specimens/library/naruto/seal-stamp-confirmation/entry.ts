import type { Specimen } from '../../../types'

export const sealStampConfirmation: Specimen = {
  id: 'seal-stamp-confirmation',
  ref: 'SPX-2379',
  title: 'Seal Stamp Confirmation',
  blurb:
    'A stamp strikes a briefing card; the ink mark overshoots to −14° then settles at −6° while a confirmation ring pulses once.',
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
  tags: ['stamp', 'confirmation', 'impact', 'overshoot'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the stamp appears already struck with the ink mark settled at −6°; no descent or ring.',
  },
  acceptance: [
    'Stamp descends 220ms then impacts 90ms',
    'Ink mark overshoots −14° and settles at −6°',
    'Confirmation ring pulses exactly once for 280ms',
    'Reduced motion shows settled FILED mark immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#140c0c;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,300px);min-height:180px;border:1px solid #3a2820;background:#e8dcc8;padding:1.25rem;color:#140c0c;font:700 13px ui-serif,Georgia,serif;">Permit draft{{specimen}}</div></div>`,
    width: 340,
    height: 340,
    background: 'dark',
    label: 'Seal stamp confirmation',
  },
}
