import type { Specimen } from '../types'
export const energyTransfer: Specimen = {
  id: 'energy-transfer',
  ref: 'SPX-2011',
  title: 'Energy Transfer',
  blurb:
    'A charged source node sends one luminous packet along an angular path to an idle target, which flips to TRANSFERRED on arrival.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired energy handoff / quirk transfer language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['energy', 'transfer', 'hud'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, path and TRANSFERRED appear immediately without packet travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',

    label: 'Energy transfer',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~420×320).',
    'Import demo.css verbatim; freeze path 280ms, travel 500ms, hit 320ms.',
    'Wire runEnergyTransfer / resetEnergyTransfer / replayEnergyTransfer.',
    'Honour both reduced-motion triggers with immediate TRANSFERRED state.',
  ],
  acceptance: [
    'TRANSFER illuminates path then sends one packet source → target',
    'Target IDLE and TRANSFERRED are visually distinct',
    'Effect clips to specimen; no external resources',
    'RESET restores idle target; replay is deterministic',
    'Reduced motion shows TRANSFERRED immediately',
    'Palette #38A3FF / #101820 / #F4F7FA / #FF4D35',
  ],
}
