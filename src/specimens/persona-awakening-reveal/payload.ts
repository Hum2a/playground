import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Keep AWAKENED copy in the DOM under the shell for the whole life of the effect — swap copy while covered, never inject after reveal.',
    'Import demo.css verbatim; freeze the five shell polygons, fracture origin 47% 54%, separation transforms, and ~1000ms timeline.',
    'Call runPersonaAwakening / resetPersonaAwakening; honour both reduced-motion triggers with an immediate settled pose.',
    'Announce Identity unknown → Identity awakened. Signature Blue. via aria-live; keep shell/fractures decorative.',
    'No character imagery, Persona cards, masks, logos, or copied summon assets.',
  ],
  acceptance: [
    'Initial state restrained and fully contained behind ~five dark-blue glass regions',
    'Pressure (pale seam glow + ≤1.015 scale) appears before fracture',
    'About four new angular fractures radiate from off-centre 47% 54%',
    'Pale-blue breach expands ~0.2→1.1 around 360ms while shell stays in front',
    'Shell separates into five major pieces with documented outbound transforms',
    'Exactly five energy streaks appear during separation then vanish',
    'AWAKENED already exists underneath; scales 0.96→1.03→1',
    'Four-segment angular blue frame assembles; final state is completely still',
    'Reduced motion immediately shows AWAKENED + static frame',
    'No character/game assets, dependencies, or network',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:300px;border:1px solid #1a2a38;border-radius:2px;background:#020a14;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
