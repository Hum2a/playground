import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Wire Reveal to idle→veil→rays→tier→done (not unlock-toast phases).',
    'Import demo.css verbatim; freeze veil 280 / rays 420 / tier-hold 360 / settle 220ms.',
    'Keep CONCEALED veil, 6 rays, and GOLD tier hold as the silhouette.',
    'Preserve both reduced-motion overrides on veil, rays, card, and tier.',
  ],
  acceptance: [
    'Reveal sequence is veil → rays → GOLD tier hold → done (not enter/shine toast).',
    'Striped CONCEALED veil thins before the card appears.',
    'Exactly 6 rays bloom; GOLD badge overshoots and holds for 360ms.',
    'Reduced motion shows the settled gold card with no veil/rays/tier motion.',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
