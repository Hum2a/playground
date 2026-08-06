import type { Specimen } from '../../../types'
export const fingerprintAcquisitionField: Specimen = {
  id: 'fingerprint-acquisition-field',
  ref: 'SPX-1830',
  title: 'Fingerprint Acquisition Field',
  blurb:
    '88×88 hold target with 12 arc segments lighting over 900ms; release before 720ms rewinds; success resolves to check mark.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired biometric acquisition progress',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['biometric', 'authentication', 'progress'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Segments change in discrete stages with no pulsing or scaling under both reduced-motion triggers.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 400,
    background: 'dark',

    label: 'Fingerprint acquisition field',
  },

}
