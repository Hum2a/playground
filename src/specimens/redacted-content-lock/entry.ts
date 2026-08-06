import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  {{specimen}}
</div>
`.trim()

export const redactedContentLock: Specimen = {
  id: 'redacted-content-lock',
  ref: 'SPX-133',
  title: 'Redacted Content Lock',
  blurb:
    'Locked lesson card with five irregular black redaction bars and a diagonal RESTRICTED stamp; unlock retracts censorship without fading host copy.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 graphic print / physical censorship lock language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['lock', 'clip-path', 'stagger', 'paper'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Bar travel and stamp attack are skipped under prefers-reduced-motion or data-force-reduced-motion; locked and unlocked states switch instantly.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 300,
    background: 'card',
    scaffold,
    label: 'Redacted lesson card',
  },
  integration: [
    'Keep host lesson copy in the DOM while locked; cover regions with bar elements nested on local text wrappers — do not fade the underlay.',
    'Import demo.css verbatim; freeze each bar’s width, height, rotation, clip-path, entry direction, and stagger timings.',
    'Disable the primary action semantically while locked (disabled / aria-disabled); do not treat the overlay as a security boundary.',
    'Announce locked state separately (e.g. “Advanced Typescript. Restricted content.”) and hide underlying copy from AT when access is denied.',
    'Wire lockRedactedContent / unlockRedactedContent; honour both reduced-motion triggers with an immediate state switch.',
  ],
  acceptance: [
    'Approximately five distinct irregular redaction bars obscure title, description portions, metadata, and action',
    'Bars enter sequentially from multiple directions with overshoot settle; RESTRICTED stamp arrives last',
    'Settled locked state does not loop, pulse, or glitch',
    'Unlock removes stamp first then retracts bars; host content never fades',
    'OPEN LESSON is semantically unavailable while locked',
    'Reduced motion switches instantly between fully redacted and fully readable',
    'No external assets, fonts, libraries, or network; usable around 320px',
  ],
}
