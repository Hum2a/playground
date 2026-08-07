import type { Specimen } from '../../../types'

export const cardToDetailsMorph: Specimen = {
  id: 'card-to-details-morph',
  ref: 'SPX-3380',
  title: 'Card-to-Details Morph',
  blurb:
    'A compact tile morphs into a larger details surface with frozen shared-element timings.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI motion (abstract)' },
  facets: { kind: 'transition', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['morph', 'details'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, morph size and body opacity snap to end states.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 320,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
    label: 'Card-to-Details Morph demo',
  },
  acceptance: [
    'Toggle morphs the same surface from 100×120 to 280×168 over 260ms.',
    'Details body becomes visible after an 80ms delay within the morph.',
    'aria-expanded and data-phase stay in sync for tile/details.',
    'Reduced motion snaps size and body with no transition.',
  ],
}
