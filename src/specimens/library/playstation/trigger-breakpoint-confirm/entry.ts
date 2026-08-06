import type { Specimen } from '../types'

export const triggerBreakpointConfirm: Specimen = {
  id: 'trigger-breakpoint-confirm',
  ref: 'SPX-3369',
  title: 'Trigger Breakpoint Confirm',
  blurb: 'A hold bar crosses a visible resistance notch before committing — release before the notch cancels.',
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
  },
  tags: ["dualsense","hold"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Hold threshold preserved; notch glow animation removed under reduced motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 300,
    background: 'dark',
    label: 'Trigger Breakpoint Confirm demo',
  },
}
