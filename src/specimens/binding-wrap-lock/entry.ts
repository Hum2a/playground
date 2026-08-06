import type { Specimen } from '../types'
export const bindingWrapLock: Specimen = {
  id: 'binding-wrap-lock',
  ref: 'SPX-2154',
  title: 'Binding Wrap Lock',
  blurb:
    'Four binding strips rapidly wrap a target card and settle into a LOCKED restricted state.',
  origin: {
    project: 'Original',
    surface: 'anime/comic action language study',
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
  tags: ['binding', 'lock', 'restrict', 'wrap'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, strips and LOCKED label appear instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'card',

    label: 'Target card',
  },
  integration: [
    'Mount card in relative overflow-hidden host.',
    'Wrap sequence 500ms; total 1150ms.',
    'Wire Restrict / Replay to runBindingWrapLock.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Four strips wrap card from edges',
    'LOCKED label appears at end',
    'Card border shifts to accent lock state',
    'Replay clears strips and lock',
    'Reduced motion: instant locked state',
  ],
}
