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
    'Mount inside a relative overflow-hidden host (~360×340+).',
    'Import demo.css verbatim; use only the exact four-tone palette, keep 16×16 / 4px entities, steps(6) slides, and start REMOTE exactly 60ms before LOCAL.',
    'Call monochromeBattleSlideIn.run() / .reset() or use ENCOUNTER / RESET.',
    'Do not replace steps() with smooth easing; do not use Pokémon sprites or fonts.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate battle layout.',
  ],
  acceptance: [
    'Exactly four visible palette tones, and no additional visible colour: #0f1b16 #40513c #8b9c68 #d6ddb0',
    'Original abstract 16×16 pixel entities; no Pokémon sprites',
    'Three horizontal bands interrupt with steps() (~160ms)',
    'REMOTE/right begins exactly 60ms before LOCAL/left; both use steps(6, end) over 300ms to 28% / 72%',
    'LOCAL and REMOTE labels align to their respective left and right entities after arrival',
    'Ground lines build in four discrete chunks after arrival; labels use steps(3, end)',
    'Final confrontation is completely static; reduced motion immediate',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0f1b16;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
