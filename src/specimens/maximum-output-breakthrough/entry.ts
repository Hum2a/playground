import type { Specimen } from '../types'
export const maximumOutputBreakthrough: Specimen = {
  id: 'maximum-output-breakthrough',
  ref: 'SPX-2111',
  title: 'Maximum Output Breakthrough',
  blurb:
    'Output meter reaches 100% then physically breaks beyond its track with an accent burst shard.',
  origin: {
    project: 'Original',
    surface: 'anime/comic action language study',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['meter', 'breakthrough', 'maximum', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, meter shows extended MAX+ state immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',

    label: 'Output meter',
  },
  integration: [
    'Mount in overflow-visible relative host; import demo.css verbatim.',
    'Fill 580ms then break 320ms; total 1230ms.',
    'Wire Breakthrough / Replay to runMaximumOutputBreakthrough.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Meter fills to nominal 100%',
    'Fill extends past track with burst shard',
    'MAX+ label appears at breakthrough',
    'Replay resets meter to 72% idle',
    'Reduced motion: breakthrough state instant',
  ],
}
