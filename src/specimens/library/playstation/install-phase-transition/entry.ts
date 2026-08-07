import type { Specimen } from '../../../types'

export const installPhaseTransition: Specimen = {
  id: 'install-phase-transition',
  ref: 'SPX-3357',
  title: 'Install Phase Transition',
  blurb:
    'Same-card morph: download ring becomes segmented install bars while the phase label shifts DOWNLOAD → INSTALL → READY.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired system UI motion study (abstract)',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'playstation',
    works: ['ps5'],
  },
  tags: ['install', 'phase'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Under reduced motion Run jumps directly to READY with install bars full.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 360,
    background: 'dark',
    label: 'Install Phase Transition demo',
  },
  acceptance: [
    'Download phase fills a circular ring on the same card.',
    'Phase label changes DOWNLOAD → INSTALL; geometry morphs ring → four install bars over 320ms.',
    'Install continues on bars without resetting the card; done state shows READY.',
    'Reduced motion jumps directly to READY with install bars full.',
  ],
}
