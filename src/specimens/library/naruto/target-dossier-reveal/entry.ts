import type { Specimen } from '../types'

export const targetDossierReveal: Specimen = {
  id: 'target-dossier-reveal',
  ref: 'SPX-2584',
  title: 'Target Dossier Reveal',
  blurb:
    'A restricted profile dossier opens through a redaction layer and a wax seal to reveal its target intel.',
  origin: {
    project: 'Original',
    surface: 'Naruto / bingo-book-target-dossier — restricted profile',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['dossier', 'reveal', 'intel'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the dossier appears already declassified with intel visible.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Target dossier reveal',
  },
}
