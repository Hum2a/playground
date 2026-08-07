import type { Specimen } from '../../../types'
export const sectorRadarSearch: Specimen = {
  id: 'sector-radar-search',
  ref: 'SPX-1060',
  title: 'Sector Radar Search',
  blurb:
    'A phosphor instrument for REGION // 12 runs two finite sweep wedges across an eight-sector grid; four blips compare at fixed strengths, then Node D locks at distance 2.4 with brackets and triangulation.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired spatial search / target lock instrument',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['search', 'radar', 'discovery', 'target-lock', 'instrument'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, SEARCH jumps to the locked Node D readout with brackets and triangulation lines.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 460,
    background: 'dark',
    label: 'Sector radar instrument search',
  },
  integration: [
    'Preserve circular field, 8 sectors, 4 bands, 42° conic sweep wedge, and two 1200ms passes maximum.',
    'Keep four fixed candidate coordinates/strengths; D (.92) is the only lock target.',
    'Four brackets and exactly three triangulation lines; no continuing radar loop.',
  ],
  acceptance: [
    'Instrument reads as circular radar with sweep wedge — not a list search',
    'Exactly four fixed blips discovered in pass one (B/D/C/A order)',
    'Pass two rejects B/C/A; D locks with four brackets and three triangulation lines',
    'Final state is static: TARGET LOCKED, NODE D, distance 2.4',
  ],
}
