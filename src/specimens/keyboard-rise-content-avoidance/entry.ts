import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim()

export const keyboardRiseContentAvoidance: Specimen = {
  id: 'keyboard-rise-content-avoidance',
  ref: 'SPX-1836',
  title: 'Keyboard Rise & Content Avoidance',
  blurb:
    '390×260 keyboard rises over 260ms; viewport reflows so focused input stays 16px above keys — bottom and top inputs behave differently.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired keyboard layout avoidance',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['keyboard', 'layout', 'focus'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, keyboard and layout reflow instantly.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 390,
    height: 700,
    background: 'dark',
    scaffold,
    label: 'Keyboard rise content avoidance',
  },
  integration: [
    'Mount inside relative overflow-hidden host (~390×700).',
    'Import demo.css verbatim; simulated keyboard only.',
    'Bottom input scrolls into view; top input needs little adjustment.',
    'Dismiss restores scroll where possible.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Bottom input remains visible above keyboard',
    'Higher input not unnecessarily moved',
    'Keyboard changes available layout height',
    'Dismiss restores previous scroll where possible',
    'No native keyboard APIs',
    'Reduced motion: instant reflow',
  ],
}
