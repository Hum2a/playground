import type { Specimen } from '../../../types'

export const jrpgVictoryResultsTally: Specimen = {
  id: 'jrpg-victory-results-tally',
  ref: 'SPX-1216', title: 'JRPG Victory Results Tally',
  blurb: 'Five software-operation result rows resolve into an original decisive CLEAR state.',
  origin: { project: 'Original', surface: 'JRPG-style post-operation results' },
  facets: {
    kind: 'interaction', tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  tags: ['results', 'tally', 'completion'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'All rows, final values, and CLEAR render immediately.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320, background: 'dark', label: 'JRPG operation results',
  },
}
