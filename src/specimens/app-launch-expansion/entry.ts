import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#101218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const appLaunchExpansion: Specimen = {
  id: 'app-launch-expansion',
  ref: 'SPX-1399',
  title: 'App Launch Expansion',
  blurb:
    'APP // 05 expands from its exact 72×72 slot to a full ANALYTICS surface over 430ms while siblings recede to scale .92; glyph peaks at 1.18.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired grid tile launch transition',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['launch', 'expansion', 'grid', 'shared-origin'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, grid and detail swap instantly with outline — no large spatial travel.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 300,
    height: 380,
    background: 'dark',
    scaffold,
    label: 'App launch expansion',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (300×380 preview).',
    'Import demo.css verbatim; freeze 3×3 grid 72×72 gap 22, expand 430ms, radius 18→0.',
    'Wire launchAppExpansion on App 05 tile / closeAppExpansion on CLOSE.',
    'Sibling tiles recede scale(.92) over 180ms; detail reveals after 58%.',
    'Honour both reduced-motion triggers with instant state swap.',
  ],
  acceptance: [
    'Exactly nine tiles in 3×3 grid; App 05 is launch origin',
    'Expansion begins at exact measured tile bounds',
    'Corner radius morphs 18px → 0 over 430ms',
    'Glyph scales to 1.18 then becomes ANALYTICS header identity',
    'Other tiles scale .92 and recede over 180ms',
    'Destination content reveals after 58% transition progress',
    'CLOSE contracts back to exact App 05 slot without drift',
    'Reduced motion: short non-spatial state change',
  ],
}
