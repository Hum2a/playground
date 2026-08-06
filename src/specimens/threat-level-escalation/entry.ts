import type { Specimen } from '../types'
export const threatLevelEscalation: Specimen = {
  id: 'threat-level-escalation',
  ref: 'SPX-2066',
  title: 'Threat Level Escalation',
  blurb:
    'Threat meter steps through five discrete levels with increasing structural intensity until CRITICAL state.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia-inspired emergency threat level system',
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
  tags: ['threat', 'escalation', 'meter', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, meter jumps directly to LEVEL 5 CRITICAL without stepping.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Threat meter',
  },

}
