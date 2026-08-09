import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount the fragment in a relative, overflow-hidden host at least 360×320px.',
    'Import demo.css verbatim; retain the 72px cursor, 130×42px panels, fixed positions, and frozen navy/silver/cyan palette.',
    'Load demo.js after the markup to open the menu and provide keyboard and pointer command selection.',
    'Keep the five real button elements so Arrow keys, Enter, Space, pointer activation, and visible focus remain available.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion: reveal every command at its final position with no animation.',
  ],
  acceptance: [
    'Exactly five command buttons exist: ATTACK, MAGIC, ITEM, GUARD, and SPECIAL.',
    'Opening starts every command at the 72×72px central selector and settles it into one fixed, non-overlapping fan position.',
    'Each 130×42px panel enters over 260ms with a fixed 55ms stagger and begins at scale(0.82) with zero opacity.',
    'Arrow keys move focus and selection through the five commands; Enter or Space activates the focused command.',
    'The selected command has cyan border/text feedback and scales to 1.06 after the fan settles; keyboard focus has a white outline.',
    'Reduced motion immediately renders all five commands in their final positions while retaining pointer and keyboard selection.',
    'No external assets, network requests, runtime randomness, or framework runtime are used.',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#111827;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
