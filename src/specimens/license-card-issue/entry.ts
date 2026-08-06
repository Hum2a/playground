import type { Specimen } from '../types'

export const licenseCardIssue: Specimen = {
  id: 'license-card-issue',
  ref: 'SPX-2195',
  title: 'License Card Issue',
  blurb:
    'ISSUE builds a provisional hero license through photo, data lines, and a VALID seal stamp.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired hero license issuance UI',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['credential', 'license', 'issue'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Full card appears immediately without staged construction.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',

    label: 'License card issue',
  },
  integration: [
    'ISSUE runs staged photo → data → seal sequence.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Three construction stages end at VALID seal',
    'RESET returns blank card',
    'Reduced motion shows complete card immediately',
  ],
}
