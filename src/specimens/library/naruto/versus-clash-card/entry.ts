import type { Specimen } from '../../../types'

export const versusClashCard: Specimen = {
  id: 'versus-clash-card',
  ref: 'SPX-2560',
  title: 'Versus Clash Card',
  blurb:
    'Two profile cards slam 28px inward, hold clash for 180ms, then lock CLASH with a VS flash.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction motion UI language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['versus', 'clash', 'match'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, both cards appear already locked in CLASH with no slam.',
  },
  acceptance: [
    'Idle cards sit 28px apart from centre (STANDBY)',
    'Cards slam inward over 240ms then hold clash 180ms',
    'VS flash 200ms then CLASH locks with alarm borders',
    'Replay returns cards to 28px apart before rerunning',
    'Reduced motion shows CLASH locked immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Versus Clash Card',
  },
}
