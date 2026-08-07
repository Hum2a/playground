import type { Specimen } from '../../../types'

export const targetDossierReveal: Specimen = {
  id: 'target-dossier-reveal',
  ref: 'SPX-2584',
  title: 'Target Dossier Reveal',
  blurb:
    'Three redaction bands lift in order (0→1→2, 110ms stagger) to declassify a sealed target dossier.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction motion UI language',
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
  tags: ['dossier', 'redaction', 'reveal'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all three bands are already lifted and REVEALED shows immediately.',
  },
  acceptance: [
    'Idle shows three redaction bands covering intel with SEALED mark',
    'Bands lift in order 0→1→2 with 110ms stagger (160ms lift each)',
    'Resolved shows REVEALED intel with bands gone',
    'Replay restores all three bands before rerunning',
    'Reduced motion shows all bands lifted / REVEALED immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#1a1612;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,300px);min-height:180px;border:1px solid #3a3228;background:#ebe2d0;padding:1.25rem;color:#1a1612;font:700 13px ui-serif,Georgia,serif;">Classified file{{specimen}}</div></div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Target Dossier Reveal',
  },
}
