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
    'Mount inside a relative overflow-hidden host; import demo.css verbatim.',
    'CLOSE: game left/top/width/height → origin tile over 520ms; then home focus.',
    'Honour both reduced-motion triggers — remove motion, keep end states.',
  ],
  acceptance: [
    'Game surface collapses spatially into origin tile slot (not opacity-only fade)',
    'Home rail is visible under the game and brightens on return',
    'At home: origin tile has focus ring; game surface is gone',
    'Uses unique .gcr chrome — not shared .ps twinning',
    'Reduced motion snaps playing→home with no travel',
  ],
  scaffold:
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  files: { html, css, js },
  spec,
  contract,
}

export default payload
