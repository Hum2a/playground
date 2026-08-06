import type { Specimen } from '../../../types'
export const biometricScanAcquisition: Specimen = {
  id: 'biometric-scan-acquisition',
  ref: 'SPX-1426',
  title: 'Identity Scan Acquisition',
  blurb:
    'Abstract 180×180 identity field with 16 nodes — two 420ms scan passes, four brackets inward 6px, validation hold 120ms, OPEN VAULT unlocks after VERIFIED.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired biometric acquisition sequence',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['authentication', 'acquisition', 'scan'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediately show all 16 nodes acquired and VERIFIED.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 280,
    height: 320,
    background: 'dark',

    label: 'Identity scan acquisition',
  },

}
