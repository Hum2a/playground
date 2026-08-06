import type { Specimen } from '../types'
export const heroAssignmentTransfer: Specimen = {
  id: 'hero-assignment-transfer',
  ref: 'SPX-2057',
  title: 'Hero Assignment Transfer',
  blurb:
    'HERO-12 chip travels from the available roster into an incident assignment slot with magnetic slot highlight.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia-inspired hero agency assignment UI',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['assignment', 'transfer', 'roster', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, chip disappears and slot shows HERO-12 ASSIGNED immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Hero assignment',
  },
  integration: [
    'Mount inside relative overflow-hidden host.',
    'Import demo.css verbatim; freeze 740ms chip transfer path.',
    'Call runHeroAssignment() from ASSIGN.',
    'Use reset/replay for deterministic harness restart.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'HERO-12 chip visibly travels toward incident slot',
    'Slot highlights during transfer',
    'Final state shows HERO-12 ASSIGNED in slot',
    'Replay restores roster chip and empty slot',
    'Reduced motion jumps to assigned state',
    'Sandbox-safe with no external resources',
  ],
}
