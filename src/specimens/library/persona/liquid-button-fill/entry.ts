import type { Specimen } from '../../../types'

export const liquidButtonFill: Specimen = {
  id: 'liquid-button-fill',
  ref: 'SPX-410',
  title: 'Liquid Button Fill',
  blurb: 'A controlled dark-blue liquid rises through a semantic action button on hover or keyboard focus.',
  origin: { project: 'Original', surface: 'Persona 3 Reload-inspired water interface feedback' },
  facets: {
    kind: 'interaction',
    tech: 'css-only',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: { franchise: 'persona', works: ['persona-3-reload'] },
  tags: ['liquid', 'waterline', 'button', 'fill'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Active hover and focus show a static full liquid layer with no surface drift.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 620, height: 360, background: 'dark', label: 'Liquid fill action button',
  },
}
