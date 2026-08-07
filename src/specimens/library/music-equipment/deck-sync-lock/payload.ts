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
  integration: [
    'Import portable CSS verbatim.',
    'Use the Start action and Reset control for deterministic state.',
    'Honor both reduced-motion triggers.'
  ],
  acceptance: [
    'Shows two labelled deck discs, explicit BPM values, and phase markers.',
    'Final state aligns deck B to 124.0 BPM and reports a 0? phase lock.',
    'Uses only inline deterministic geometry and data.',
    'Includes Start and Reset controls plus a polite live status message for every state.',
  ]
} satisfies SpecimenPayload
