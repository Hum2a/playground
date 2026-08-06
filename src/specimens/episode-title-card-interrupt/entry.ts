import type { Specimen } from '../types'
export const episodeTitleCardInterrupt: Specimen = {
  id: 'episode-title-card-interrupt',
  ref: 'SPX-2217',
  title: 'Episode Title Card Interrupt',
  blurb:
    'Live application state pauses for a stark finite title-card reveal before holding on the interrupted briefing.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia-inspired comic/anime action language',
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
  tags: ['title-card', 'interrupt', 'overlay', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, the title card appears immediately over a dimmed app shell.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 320,
    background: 'dark',

    label: 'Episode title card interrupt',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; preserve 420ms slide-in timing.',
    'Wire Interrupt trigger; reset via resetEpisodeTitleCardInterrupt().',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Interrupt trigger pauses app and reveals EPISODE // 12 title card',
    'Title card stays clipped inside the specimen bounds',
    'Replay resets overlay and app opacity deterministically',
    'Reduced motion shows final interrupted state immediately',
  ],
}
