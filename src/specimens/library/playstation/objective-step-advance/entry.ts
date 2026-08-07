import type { Specimen } from '../../../types'

export const objectiveStepAdvance: Specimen = {
  id: 'objective-step-advance',
  ref: 'SPX-3341',
  title: 'Objective Step Advance',
  blurb:
    'Completing a focused objective hands progress and a focus ring to the next step in the chain.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['objective', 'workflow'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, each advance snaps focus without pulse travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Objective step advance',
  },
  acceptance: [
    'Exactly one step shows the focus ring at a time.',
    'Advancing completes the current step, pulses the connector (280ms), then focuses the next.',
    'Connector rails stay filled after each handoff.',
    'Reduced motion snaps each handoff with no pulse travel.',
  ],
}
