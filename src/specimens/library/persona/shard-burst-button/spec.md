# Shard Burst Button (portable recreation spec)

Persona 3–inspired **confirmation control**. Activating the semantic `CONFIRM`
button releases exactly twelve fixed blue-glass shards, then leaves the control
in an explicit `CONFIRMED` state.

## Visual intent

- A square-cornered blue-glass button, never a pill or decorative panel
- Twelve small triangular shards originate at the button centre
- The burst is deterministic: each shard has a fixed vector and rotation
- The settled confirmation state remains clear after the shards have faded

## DOM structure

```
.sbb[data-shard-burst-button]
  .sbb__kicker
  .sbb__stage
    .sbb__shards[aria-hidden]
      i.sbb__shard--1 … i.sbb__shard--12
    button.sbb__button[data-sbb-confirm]
      [data-sbb-label]
  .sbb__status[role=status]
```

## Interaction

- Native button activation (pointer, Space, or Enter) confirms.
- Every activation restarts the same 420ms burst safely, including while a prior
  burst is active.
- The button text changes from `CONFIRM` to `CONFIRMED`; the polite status says
  `Confirmed.`.

## Motion and reduced motion

The twelve shards burst outward over `420ms` with
`cubic-bezier(.16,.78,.3,1)` and then disappear. Under either
`prefers-reduced-motion: reduce` or `data-force-reduced-motion="true"`, the
button immediately reaches its confirmed state and shards never travel.

## Accessibility

Use a real `<button>` for the confirm action. Decorative shards are hidden from
assistive technology. The visible focus ring uses the pale glass colour, and
text communicates confirmation independently of colour.

## Porting

1. Copy `demo.html`, `demo.css`, and `demo.js` verbatim.
2. Preserve all twelve shard elements and their frozen vectors.
3. Call `window.shardBurstButton.trigger(root)` for programmatic activation.
4. Preserve both reduced-motion triggers.
