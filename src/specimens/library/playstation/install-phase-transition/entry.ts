import type { Specimen } from '../../../types'

export const installPhaseTransition: Specimen = {
  id: 'install-phase-transition',
  ref: 'SPX-3357',
  title: 'Install Phase Transition',
  blurb: 'Download progress converts into an installation phase on the same card — label and ring accent shift without resetting layout.',
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
  },
  tags: ["install","phase"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Under reduced motion Run jumps directly to the install-complete state.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 340,
    background: 'dark',
    label: 'Install Phase Transition demo',
  },
}
