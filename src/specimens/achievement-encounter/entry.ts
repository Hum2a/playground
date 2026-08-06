import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:240px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  <div style="opacity:0.5;padding:1rem;">
    <div style="font:700 0.65rem/1.2 system-ui,sans-serif;letter-spacing:0.16em;text-transform:uppercase;color:#767e8c;">Rewards</div>
    <div style="margin-top:0.45rem;font:600 0.9rem/1.25 system-ui,sans-serif;color:#e6e8ec;">Season milestones</div>
  </div>
  {{specimen}}
</div>
`.trim()

export const achievementEncounter: Specimen = {
  id: 'achievement-encounter',
  ref: 'SPX-010',
  title: 'Achievement Encounter',
  blurb:
    'Achievement unlock staged as a rare encounter: battle streaks, a sky/grass arena, a flashing geometric badge, then a rising message box.',
  origin: {
    project: 'Original',
    surface: 'Classic creature-battle encounter presentation language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['battle', 'announcement', 'achievement'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Streak sweep is skipped under prefers-reduced-motion or data-force-reduced-motion; final arena, badge, and message appear immediately with a one-shot status announcement.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 280,
    background: 'card',
    scaffold,
    label: 'Achievement unlock encounter',
  },
  integration: [
    'Mount inside a relative, overflow-hidden host (~240px tall) so streaks and arena clip cleanly.',
    'Import demo.css verbatim; keep the frozen grass/sky/ink/paper/gold palette and phase timings.',
    'Call runAchievementEncounter() from your unlock control, or use the built-in UNLOCK ACHIEVEMENT button.',
    'Wire replayAchievementEncounter() for re-triggers / harness Restart; do not append duplicate overlay nodes.',
    'Keep the role=status live region so “Achievement unlocked: Early Adopter” announces once on settle.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the instant final pose.',
  ],
  acceptance: [
    'Reads as an encounter reveal without Pokémon names, characters, balls, logos, or sprites',
    'Achievement starts concealed; trigger reveals the sequence',
    'Message box appears after badge reveal (~1000ms into the sequence)',
    'No continuous motion after the ~1250ms settle',
    'Reduced motion skips streaks and shows static arena + badge + message',
    'Status region announces the achievement title once',
    'No images, network, or dependencies; works ~320–768px',
  ],
}
