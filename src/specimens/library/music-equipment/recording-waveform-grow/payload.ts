import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'
const payload: SpecimenPayload = { files: { html, css, js }, spec, contract, integration: ['Import the portable CSS verbatim.', 'Use ENGAGE and RESET to control state.', 'Honor both reduced-motion triggers.'], acceptance: ['Uses original manufacturer-neutral hardware geometry.', 'Uses deterministic visual state only; no audio or external assets.', 'Preserves an accessible static engaged state.'] }
export default payload
