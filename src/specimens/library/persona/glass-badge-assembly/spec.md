# Glass Badge Assembly (portable recreation spec)

Persona 3–inspired **glass badge assembly**. Nine distinct, deterministic shards
travel from a loose perimeter into a single diamond badge. The assembled state is
readable and persists; it never loops.

## Visual intent

- Dark navy depth field with a faint technical grid
- One `122 × 122px` diamond made from exactly nine `42 × 42px` clipped glass fragments
- Fragments use pale cyan highlights, translucent deep-blue bodies, and thin glass edges
- Final badge reveals `P3` and `ASSEMBLED`, providing a non-colour completion signal

## DOM structure

```
.gba[data-glass-badge-assembly][data-state]
  .gba__kicker
  .gba__stage[aria-hidden=true]
    .gba__badge
      span.gba__fragment--1 … span.gba__fragment--9
      .gba__mark
      .gba__caption
  button.gba__button[data-gba-assemble]
  .gba__status[role=status]
```

## Deterministic assembly

Each fragment has a fixed source translation, rotation, and delay. The delays are
`0, 55, 110, 165, 220, 275, 330, 385, 440ms`; each fragment then settles over
`620ms` with `cubic-bezier(.18,.86,.22,1)`. The whole sequence completes at
`1060ms`. Re-activating **ASSEMBLE** cancels the old animation timer, resets to
idle, and starts a new run on the next frame.

## API

- `window.glassBadgeAssembly.init(scope?)`
- `window.glassBadgeAssembly.assemble(root)`

`assemble(root)` is safe during idle, assembly, or completion. It clears only
that root's pending frame/timer and never shares state between instances.

## Reduced motion

Under either `prefers-reduced-motion: reduce` or
`[data-force-reduced-motion="true"]`, all nine fragments immediately settle into
the completed badge. `P3`, `ASSEMBLED`, and the polite status remain visible.

## Accessibility

The decorative fragment stage is hidden from assistive technology. A native
`button` with visible `:focus-visible` styling triggers assembly, and the polite
status region announces reset, assembly, and completion. Text and the completed
silhouette communicate state alongside colour.

## Porting

1. Copy `demo.html`, `demo.css`, and `demo.js` verbatim.
2. Preserve exactly nine fragment nodes and their fixed trajectories.
3. Preserve the native ASSEMBLE control and both reduced-motion triggers.
