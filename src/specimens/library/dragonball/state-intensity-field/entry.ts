import type { Specimen } from '../../../types'
export const stateIntensityField: Specimen = {
  id: 'state-intensity-field',
  ref: 'SPX-1110',
  title: 'State Intensity Field',
  blurb:
    'Topographic pressure contour bands and a labelled magnitude ladder communicate four frozen ENGINE 04 load thresholds — no percentage meter.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball aura-intensity–inspired magnitude visualisation (abstract)',
  },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'graphic' },
  inspiredBy: { franchise: 'dragonball' },
  tags: ['status', 'magnitude', 'visualisation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Immediately shows Level 4 field at band 95 CRITICAL with ladder, rupture, shards, and ticks.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 400, background: 'dark', label: 'State intensity field' },
  integration: [
    'Keep four frozen contour bands, rupture boundary, magnitude ladder, and shard/tick counts per level.',
    'Call window.stateIntensityField.increase() / .reset() / .init().',
    'Ladder and status commit only after each structural level is reached (+220ms hold).',
  ],
  acceptance: [
    'Exactly four levels: bands 1/2/3/4, shards 0/2/4/8, ladder thresholds 20/45/70/95.',
    'Four cardinal ticks appear only at Level 4 (past 90% threshold).',
    'Transitions are 300/300/360ms with 220ms hold; no randomness.',
    'Reduced motion immediately renders the static Level 4 field.',
  ],
}
