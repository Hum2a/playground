import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div class="lesson-card" style="position:relative;overflow:hidden;width:100%;height:200px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  <div class="lesson-card__content" style="opacity:0.55;padding:1rem;">
    <div style="font:600 0.9rem/1.2 system-ui,sans-serif;color:#e6e8ec;">Lesson 2</div>
    <div style="margin-top:0.35rem;font:400 0.75rem/1.4 system-ui,sans-serif;color:#767e8c;">Conversation practice</div>
    <span class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">Coming soon</span>
  </div>
  {{specimen}}
</div>
`.trim()

export const comingSoonTape: Specimen = {
  id: 'coming-soon-tape',
  ref: 'SPX-001',
  title: 'Coming-soon caution tape',
  blurb:
    'Diagonal black-and-yellow keep-out tape with a bilingual Coming Soon marquee over a locked card.',
  origin: { project: 'Buzzer', surface: 'Teacher class launch pad' },
  tags: ['overlay', 'marquee', 'css-only', 'bilingual'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Marquee stops under prefers-reduced-motion or data-force-reduced-motion; the static tape stays visible.',
  },
  files: { html, css },
  spec,
  contract,
  preview: {
    width: 360,
    height: 240,
    background: 'card',
    scaffold,
    label: 'Locked lesson card',
  },
  integration: [
    'Mount the tape inside a container with position: relative and overflow: hidden so the rotated strip clips to the card.',
    'Dim the card’s interactive content (about opacity 0.55) while the lock is active.',
    'Render the tape markup only when the item is locked; keep it decorative with aria-hidden on the root.',
    'Block selection and primary actions for the locked item in your own interaction layer.',
    'Expose a screen-reader-only “Coming soon” (or equivalent) label outside the decorative tape root.',
  ],
  acceptance: [
    'Tape is clipped by the card and reads at -28deg across the face',
    'Marquee loops with no visible seam',
    'Animation stops under reduced motion while the tape stays visible',
    'Lock state is announced by a screen reader without reading the tape copy',
  ],
}
