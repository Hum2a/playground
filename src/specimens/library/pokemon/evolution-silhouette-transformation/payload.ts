import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
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
    'Stops at transformed Form B; registration, canonical status, and archival are intentionally absent',
    'Reduced motion immediate; no glow loop or particles; sandbox-safe',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0c0a12;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
