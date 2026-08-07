import type { Specimen } from '../../../types'
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
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:280px;border:3px solid #101820;background:#F4F7FA;padding:0.5rem;"><div style="position:absolute;inset:0.5rem;border:2px dashed #101820;opacity:0.25;pointer-events:none;"></div>{{specimen}}</div>`,
    label: 'System monitor',
  },

}
