import type { Specimen } from '../../../types'

export const chakraSignatureMatch: Specimen = {
  id: 'chakra-signature-match',
  ref: 'SPX-2510',
  title: 'Chakra Signature Match',
  blurb:
    'Five frozen sample points (40/70/55/85/50) rise to align past threshold 0.92 into MATCH.',
  origin: {
    project: 'Original',
    surface: 'Naruto / sensory detection — signature match',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ["match","waveform","signature"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the signature appears MATCH immediately.',
  },
    acceptance: [
    'Five sample points [40,70,55,85,50] rise to meet the reference waveform',
    'Alignment crosses threshold 0.92 then latches MATCH',
    'Bars grow by height transform, not opacity fade',
    'Replay clears fills before rerunning',
    'Reduced motion shows MATCH immediately',
  ],',
    'Each bar advances on stepMs 170; MATCH only after bar 5 + settleMs 100',
    'Replay zeros all bar heights before rerunning',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070B0E;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Chakra Signature Match',
  },
}
