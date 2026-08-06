import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#0a0c10;">
  {{specimen}}
</div>
`.trim()

export const tournamentBracketActivation: Specimen = {
  id: 'tournament-bracket-activation',
  ref: 'SPX-1141',
  title: 'Tournament Bracket Activation',
  blurb:
    'MODEL ARENA // 08 wakes from dormant structure: eight seeds activate in pairs, eight first-stage paths construct into four quarter-final junctions, and the bracket settles READY — activation only, no winners.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired tournament bracket activation language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['tournament', 'comparison', 'bracket', 'activation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the fully activated quarter-final bracket appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 520,
    height: 440,
    background: 'dark',
    scaffold,
    label: 'Tournament bracket activation',
  },
  integration: [
    'Mount inside a relative overflow-clipped host; board is fixed 480×300 and scales as a unit below 480px.',
    'Import demo.css verbatim; keep pair stagger 70ms, path 140ms, eight segments and four 8×8 junctions.',
    'Call openTournamentBracket() from OPEN BRACKET; resetTournamentBracket() or harness restart returns to dormant.',
    'Keep participant names and matchup list as real text; announce readiness via the polite status region.',
    'Honour both reduced-motion triggers with the immediate active bracket.',
  ],
  acceptance: [
    'Exactly eight participants and four first-round matchups',
    'Pairs activate A/B→C/D→E/F→G/H with 70ms stagger; nodes shift inward 3px',
    'Exactly eight first-stage segments construct; exactly four matchup junctions',
    'Future rounds remain subdued; no winner implied; final BRACKET READY is static',
    'Reduced motion immediately shows active bracket',
    'No logos, characters, or franchise symbols; sandbox="allow-scripts" safe',
  ],
}
