import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'
export default { files: { html, css, js }, spec, contract, integration: ['Import portable CSS verbatim.', 'Use RUN / RESET or the embedded controls.', 'Honour both reduced-motion triggers.'], acceptance: ['Original editorial geometry and fictional copy only.', 'Final state is static and accessible.', 'No external assets; sandbox-safe.'] } satisfies SpecimenPayload
