import type { Specimen } from '../../../types'

export const targetDossierReveal: Specimen = {
  id: 'target-dossier-reveal',
  ref: 'SPX-2584',
  title: 'Target Dossier Reveal',
  blurb:
    'Three redaction bands lift on a 0/90/180ms stagger, then the wax seal snaps away to reveal Target 0311.',
  origin: {
    project: 'Original',
    surface: 'Naruto / bingo-book — target dossier declassify',
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
  tags: ["dossier","redaction","intel"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all bands are lifted and REVEALED shows immediately.',
  },
  acceptance: [
    'Exactly 3 bands lift on staggerMs [0,90,180]',
    'Seal snaps after last band; status REVEALED',
    'Reduced motion shows REVEALED immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Target dossier reveal',
  },
}
