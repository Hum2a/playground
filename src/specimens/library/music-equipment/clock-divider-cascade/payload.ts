import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'
export default { files:{html,css,js},spec,contract,integration:['Import portable CSS verbatim.','Use the supplied action and reset buttons.','Honor both reduced-motion triggers.'],acceptance:['Renders the bespoke clock divider operation with distinct idle, action, and final states.','Uses fixed deterministic values only; no audio, network, storage, clocks, or randomness.','Announces the final operation result through a polite live region.'] } satisfies SpecimenPayload
