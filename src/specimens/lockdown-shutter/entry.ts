import type { Specimen } from '../types'

export const lockdownShutter: Specimen = {
  id: 'lockdown-shutter',
  ref: 'SPX-2069',
  title: 'Lockdown Shutter',
  blurb:
    'Five segmented shutters cascade over operational content until LOCKDOWN covers the panel.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired security lockdown UI',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['lockdown', 'security', 'shutter'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Shutters and LOCKDOWN label appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',

    label: 'Lockdown shutter',
  },
  integration: [
    'Panel must use overflow:hidden; wire LOCKDOWN to runLockdownShutter.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Five shutters close in staggered sequence',
    'LOCKDOWN label visible when covered',
    'RESET restores operational view',
  ],
}
