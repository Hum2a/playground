import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'
export default { files:{html,css,js},spec,contract,integration:['Import portable CSS verbatim.','Use THREAD and RESET to inspect fixed states.','Honor both reduced-motion triggers.'],acceptance:['Renders the thread operation with fixed geometry.','Exposes clear idle, action, and final states through text and aria-live status.','Uses no audio, network, external assets, storage, or randomness.'] } satisfies SpecimenPayload
