import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0c0a12;">
  {{specimen}}
</div>
`.trim()

export const evolutionSilhouetteTransformation: Specimen = {
  id: 'evolution-silhouette-transformation',
  ref: 'SPX-724',
  title: 'Evolution Silhouette Transformation',
  blurb:
    'An abstract Form A charges, then decisively alternates with a related Form B on a timing curve that hands the new identity progressively more time until Form B locks permanently — no crossfade.',
  origin: {
    project: 'Original',
    surface: 'Pokémon-inspired evolution identity transformation language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['transformation', 'evolution', 'identity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, Form B with FORM // 02 / ADVANCED appears immediately with no charge, alternation, rings, or mark rotation.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 320,
    height: 380,
    background: 'dark',
    scaffold,
    label: 'Evolution silhouette transformation',
  },
  integration: [
    'Mount inside a relative host (~320×360+).',
    'Import demo.css verbatim; keep frozen clip-paths, 110×140 / 145×175 sizes, cycle timings, and eight marks.',
    'Call evolutionSilhouetteTransformation.run() / .reset() or use EVOLVE / RESET.',
    'Swap geometry via data-form — never opacity-crossfade A and B.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate Form B path.',
  ],
  acceptance: [
    'Two visibly related but different abstract forms; no Pokémon likeness',
    'No opacity crossfade — decisive geometry swaps',
    'A/B alternation across four cycles with Form B occupying progressively longer intervals',
    'Charge: brighten + three contracting rings over 280ms',
    'Scale grows ~1→1.12 during instability; exactly eight radial marks rotate 45° once',
    'Final identity is static Form B with FORM // 02 / ADVANCED after resolve',
    'Reduced motion immediate; no glow loop or particles; sandbox-safe',
  ],
}
