import type { Specimen } from '../types'
export const panelBreakTransition: Specimen = {
  id: 'panel-break-transition',
  ref: 'SPX-1977',
  title: 'Panel Break Transition',
  blurb:
    'An ANALYSIS comic panel shatters into four ink-bordered shards to reveal a COMPLETE status underneath.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired panel-break / scene transition language',
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
  tags: ['panel', 'shatter', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, COMPLETE shows immediately with no shard motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',

    label: 'Panel break transition',
  },
  integration: [
    'Mount in overflow-hidden host; four shards use frozen clip-paths.',
    'Wire runPanelBreak / resetPanelBreak / replayPanelBreak.',
    'Break 480ms; settle 260ms; honour reduced-motion triggers.',
  ],
  acceptance: [
    'Run shatters ANALYSIS overlay into four shards',
    'COMPLETE readable underneath after break',
    'Replay resets overlay before rerun',
    'Reduced motion skips shard translation',
    'Effect clips to stage',
  ],
}
