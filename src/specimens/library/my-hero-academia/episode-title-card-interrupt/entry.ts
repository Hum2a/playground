import type { Specimen } from '../../../types'
export const episodeTitleCardInterrupt: Specimen = {
  id: 'episode-title-card-interrupt',
  ref: 'SPX-2217',
  title: 'Episode Title Card Interrupt',
  blurb:
    'Live application state pauses for a stark title-card reveal, holds, then resumes the host UI.',
  origin: {
    project: 'Original',
    surface: 'Broadcast interrupt — finite title card over a dimmed live shell',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['title-card', 'interrupt', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, the paused shell and title card appear instantly, hold, then resume without slide.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 320,
    background: 'dark',
    label: 'Episode title card interrupt',
  },
}
