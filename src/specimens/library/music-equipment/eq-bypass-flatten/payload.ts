import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'
export default { files:{html,css,js},spec,contract,integration:['Import portable CSS verbatim.','Use ARM, COMMIT, and RESET for the fixed state sequence.','Honor both reduced-motion triggers.'],acceptance:['Renders the EQ bypass with operation-specific fixed data.','Exposes explicit idle, action, and final states in visible and live text.','Uses no audio, network access, storage, or randomness.'] } satisfies SpecimenPayload
