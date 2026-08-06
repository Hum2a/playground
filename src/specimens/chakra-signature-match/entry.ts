import type { Specimen } from '../types'

export const chakraSignatureMatch: Specimen = {
  id: 'chakra-signature-match',
  ref: 'SPX-2510',
  title: 'Chakra Signature Match',
  blurb:
    'An incoming waveform draws in and morphs to align with a reference signature, locking into a resolved MATCH readout.',
  origin: {
    project: 'Original',
    surface: 'Naruto / sensory-detection interfaces — signature comparison overlays',
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
  tags: ['match'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the incoming waveform snaps directly onto the reference and MATCH shows immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Chakra signature match',
  },
}
