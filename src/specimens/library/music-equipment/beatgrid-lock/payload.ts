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
    'Shows four numbered grid divisions, four fixed transient heights, and their offset positions.',
    'Action aligns every transient to the matching beat line and reports 0 ms.',
    'Uses deterministic inline data only and has no audio or external dependencies.',
    'Includes Start and Reset controls plus a polite live status message for every state.',
  ]
} satisfies SpecimenPayload
