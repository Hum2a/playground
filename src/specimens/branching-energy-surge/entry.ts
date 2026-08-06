import type { Specimen } from '../types'
export const branchingEnergySurge: Specimen = {
  id: 'branching-energy-surge',
  ref: 'SPX-2008',
  title: 'Branching Energy Surge',
  blurb:
    'Bright angular energy branches travel across a host surface from four corners and converge on a central action node, flashing once before settling READY.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired energy transfer language (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['energy', 'convergence', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, branches and core appear immediately in the READY end state with no draw or flash choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',

    label: 'Branching energy surge',
  },
  integration: [
    'Mount inside a relative host with overflow hidden (~360×360).',
    'Import demo.css verbatim; keep branch paths, stroke-dash draw, and core pulse timings.',
    'Wire ACTIVATE via branchingEnergySurge.run(root) or the trigger button.',
    'Replay resets to STANDBY before rerunning the surge sequence.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with immediate READY state.',
  ],
  acceptance: [
    'Four angular branches draw inward from corners toward centre',
    'Core node scales and settles after branch convergence',
    'Brief flash accent at convergence (~520ms)',
    'Final label reads READY with armed status text',
    'Replay returns to exact STANDBY idle before rerun',
    'Effect clipped to host; no external assets; sandbox allow-scripts',
    'Reduced motion shows static converged READY composition',
  ],
}
