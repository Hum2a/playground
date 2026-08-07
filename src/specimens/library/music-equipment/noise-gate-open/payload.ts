import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

export default {
  files: { html, css, js },
  spec,
  contract,
  integration: ['Import portable CSS verbatim.', 'Use OPEN and RESET for deterministic state.', 'Honor both reduced-motion triggers.'],
  acceptance: ['The gate only opens after the deterministic input changes from -62 dB to the fixed -34 dB signal above threshold.', 'Exposes idle, action, and final state through visible text and an aria-live status.', 'Uses no audio, network requests, external assets, storage, or randomness.'],
} satisfies SpecimenPayload
