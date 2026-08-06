import type { Specimen } from '../types'
export const emergencyScreenTakeover: Specimen = {
  id: 'emergency-screen-takeover',
  ref: 'SPX-2065',
  title: 'Emergency Screen Takeover',
  blurb:
    'Calm system monitor is interrupted by diagonal accent and ink warning planes that sweep across with EMERGENCY takeover copy.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia-inspired emergency villain alert system',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['emergency', 'alert', 'takeover', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, warning planes and alert copy appear immediately without sweep.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'System monitor',
  },

}
