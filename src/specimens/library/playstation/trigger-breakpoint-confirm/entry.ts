import type { Specimen } from '../../../types'

export const triggerBreakpointConfirm: Specimen = {
  id: 'trigger-breakpoint-confirm',
  ref: 'SPX-3369',
  title: 'Trigger Breakpoint Confirm',
  blurb:
    'Hold crosses a labelled 68% resistance notch — hatched band is readable before the commit zone.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired system UI motion study (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'playstation',
    works: ['ps5'],
  },
  tags: ['dualsense', 'hold'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: '1100ms hold threshold preserved; fill transitions removed under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Trigger Breakpoint Confirm demo',
  },
}
