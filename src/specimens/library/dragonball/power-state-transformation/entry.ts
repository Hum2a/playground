import type { Specimen } from '../../../types'
export const powerStateTransformation: Specimen = {
  id: 'power-state-transformation',
  ref: 'SPX-981',
  title: 'Power State Transformation',
  blurb:
    'Abstract engine upgrade: pressure marks, compression, structural Base→Ascended geometry swap with eight burst rays, then clipped STATE / THROUGHPUT / CHANNELS metrics — no character imagery.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired power-state escalation language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['transformation', 'state-change', 'burst'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Pressure, compression, rays, and field motion are skipped under prefers-reduced-motion or data-force-reduced-motion; Ascended geometry and final metrics appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 380,
    background: 'dark',
    label: 'Power state transformation',
    scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#171b20;">
  {{specimen}}
</div>
`.trim(),
  },
  integration: [
    'Mount inside a relative overflow-hidden host so rays and field clip cleanly.',
    'Import demo.css verbatim; freeze polygons, 10 marks, 8 rays, and ~920ms timeline from contract.json.',
    'Wire runPowerStateTransform / resetPowerStateTransform; honour both reduced-motion triggers with immediate Ascended.',
  ],
  acceptance: [
    'ENGINE // 04 identity persists Base → Ascended',
    'Exactly ten pressure marks and eight burst rays',
    'STATE Ascended; THROUGHPUT 3.0×; CHANNELS 6',
    'Reduced motion lands Ascended + final metrics immediately',
  ],
}
