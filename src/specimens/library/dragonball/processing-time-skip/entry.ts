import type { Specimen } from '../../../types'
export const processingTimeSkip: Specimen = {
  id: 'processing-time-skip',
  ref: 'SPX-1157',
  title: 'Processing Time Skip',
  blurb:
    'QUERY // 07 runs REQUEST, freezes on CACHE HIT, then intentionally skips PARSE / SEARCH / ASSEMBLE — the marker vanishes and reappears at RESULT with no path between, landing in 24ms vs a normal 184ms.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired Time-Skip processing language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['optimisation', 'skip', 'processing'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the final pipeline appears immediately with stages 2–4 marked SKIPPED.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 520,
    height: 360,
    background: 'dark',

    label: 'Processing time skip',
  },


}
