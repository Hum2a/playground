import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div class="paper-rip-host" data-paper-rip-host style="position:relative;overflow:hidden;width:100%;height:260px;border:1px solid #2c313c;border-radius:2px;background:#12141a;box-sizing:border-box;">
  <div class="paper-rip-underlay" style="position:absolute;inset:0;z-index:1;display:flex;flex-direction:column;justify-content:center;padding:1.25rem 1.1rem 3.5rem;box-sizing:border-box;">
    <div style="font:700 0.65rem/1.2 system-ui,sans-serif;letter-spacing:0.16em;text-transform:uppercase;color:#767e8c;">Lesson 08</div>
    <div style="margin-top:0.4rem;font:700 1rem/1.2 system-ui,sans-serif;color:#e6e8ec;text-transform:uppercase;letter-spacing:0.04em;">Advanced material</div>
    <button type="button" data-paper-rip-action disabled style="align-self:flex-start;margin-top:0.85rem;padding:0.4rem 0.7rem;border:2px solid #e6e8ec;border-radius:0;background:transparent;color:#e6e8ec;font:800 0.65rem/1 system-ui,sans-serif;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;">OPEN LESSON</button>
    <span data-paper-rip-status style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">Sealed</span>
  </div>
  {{specimen}}
  <div style="position:absolute;left:0.65rem;bottom:0.55rem;z-index:7;display:flex;gap:0.35rem;">
    <button type="button" data-paper-rip-trigger style="margin:0;padding:0.3rem 0.5rem;border:2px solid #090909;border-radius:0;background:#d71920;color:#f2eee3;font:800 0.6rem/1 system-ui,sans-serif;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;">RIP SEAL</button>
    <button type="button" data-paper-rip-reset style="margin:0;padding:0.3rem 0.5rem;border:2px solid #e6e8ec;border-radius:0;background:transparent;color:#e6e8ec;font:800 0.6rem/1 system-ui,sans-serif;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;">RESET</button>
  </div>
</div>
`.trim()

export const paperRipUnlock: Specimen = {
  id: 'paper-rip-unlock',
  ref: 'SPX-020',
  title: 'Paper rip unlock',
  blurb:
    'A sealed paper sheet tears from the centre into two zig-zag halves that violently pull apart, revealing the lesson underneath.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
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
  tags: ['unlock', 'reveal', 'tear'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Crack, tear travel, separation, and fragments are skipped under prefers-reduced-motion or data-force-reduced-motion; the paper hides immediately and the unlocked underlay remains.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 300,
    background: 'card',
    scaffold,
    label: 'Sealed lesson',
  },
  integration: [
    'Mount underlay content and the paper-rip overlay inside a relative overflow-hidden host.',
    'Keep underlay in the DOM for the whole life of the effect — never inject it after the tear.',
    'Import demo.css verbatim; keep frozen complementary clip-path polygons and 900ms timing.',
    'Disable the primary action while sealed; enable after unlock. Announce Sealed/Unlocked separately.',
    'Wire ripPaperUnlock / resetPaperRip; honour both reduced-motion triggers with immediate reveal.',
  ],
  acceptance: [
    'Initial overlay reads as one continuous paper sheet',
    'Seam between halves is not obvious while idle',
    'Tear begins around centre (~52% 46%) with an irregular zig-zag edge',
    'Underlying content becomes visible through the growing tear',
    'Sheet separates into exactly two major halves exiting opposite directions',
    'About four tiny fragments appear around rupture',
    'Content exists beneath the overlay throughout',
    'Final unlocked state remains until reset reconstructs the sheet',
    'Reduced motion switches directly between sealed and unlocked states',
    'No external dependencies, assets, or network',
  ],
}
