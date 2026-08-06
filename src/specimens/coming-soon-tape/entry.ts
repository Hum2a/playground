import type { Specimen } from '../types'
export const comingSoonTape: Specimen = {
  id: 'coming-soon-tape',
  ref: 'SPX-001',
  title: 'Coming-soon caution tape',
  blurb:
    'Diagonal black-and-yellow keep-out tape with a bilingual Coming Soon marquee over a locked card.',
  origin: { project: 'Buzzer', surface: 'Teacher class launch pad' },
  facets: {
    kind: 'overlay',
    tech: 'css-only',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['caution', 'stripe', 'marquee', 'bilingual', 'locked'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Marquee stops under prefers-reduced-motion or data-force-reduced-motion; the static tape stays visible.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 240,
    background: 'card',

    label: 'Locked lesson card',
  },

}
