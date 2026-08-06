import type { Specimen } from '../../../types'

export const skipIntroAppear: Specimen = {
  id: 'skip-intro-appear',
  ref: 'SPX-3178',
  title: 'Skip Intro Appear',
  blurb:
    'A contextual SKIP INTRO button fades in during a simulated intro window and disappears the moment it ends — available only while it is actually skippable.',
  origin: {
    project: 'Original',
    surface: 'Netflix-inspired streaming skip-intro affordance (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'netflix',
  },
  tags: ['skip', 'contextual'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Skip button still appears/disappears on the same schedule with no transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 280,
    background: 'dark',
    label: 'Skip intro appear demo',
  },
}
