import type { Specimen } from '../../../types'

export const errorSubstitutionRecovery: Specimen = {
  id: 'error-substitution-recovery',
  ref: 'SPX-2387',
  title: 'Error Substitution Recovery',
  blurb:
    'Fault on Service A leaves decoy residue while fallback Service B acquires, then latches RECOVERED — failover, not celebration.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['failover'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved RECOVERED state appears immediately.',
  },
  acceptance: [
    'Primary faults at 170ms; decoy residue (3) visible while fallback acquires at +100ms',
    'Recovery latch 140ms leaves Service B ACTIVE with primary FAULTED',
    'Reduced motion shows recovered fallback immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Error Substitution Recovery',
  },
}
