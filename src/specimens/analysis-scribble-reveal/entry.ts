import type { Specimen } from '../types'
export const analysisScribbleReveal: Specimen = {
  id: 'analysis-scribble-reveal',
  ref: 'SPX-2017',
  title: 'Analysis Scribble Reveal',
  blurb:
    'Structured profile data is rapidly annotated with handwritten-style circles, arrows, and emphasis marks that settle on a critical OUTPUT readout.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired analysis notebook UI (abstract)',
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
  tags: ['analysis', 'annotation', 'scribble'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all scribble marks appear immediately in the annotated end state.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',

    label: 'Analysis scribble reveal',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~360×360).',
    'Import demo.css verbatim; keep stroke-dash scribble timings.',
    'Wire RUN via analysisScribbleReveal.run(root) or the trigger.',
    'Replay resets to unmarked idle before rerunning.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Circle, arrow, and underline marks draw in sequence on profile panel',
    'OUTPUT value emphasised in accent at end state',
    'Status announces annotation completion',
    'Replay returns to exact idle before rerun',
    'Clipped to host; no external assets; sandbox allow-scripts',
    'Reduced motion shows all marks immediately',
  ],
}
