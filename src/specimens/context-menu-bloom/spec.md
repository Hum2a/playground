# Context Menu Bloom (portable recreation spec)

A contextual menu constructs outward from a source file row's trailing anchor,
making ownership obvious. Four actions bloom top-to-bottom with selection on the
first row. Dismiss collapses toward the anchor. No images, audio, network, or
storage.

## Visual intent

Anchor-first expansion — not a centre-screen scale. Menu boundary establishes
before row stagger; dismiss reverses toward the source.

## DOM structure

```html
<div class="cmb" data-context-menu-bloom data-phase="idle">
  <button data-cmb-source>FILE // NOTES.MD</button>
  <div data-cmb-host>
    <span data-cmb-anchor></span>
    <div data-cmb-menu role="menu">…4 items…</div>
  </div>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Source row | `FILE // NOTES.MD` |
| Actions | OPEN · RENAME · DUPLICATE · DELETE |

## Colours

| Token | Hex |
| ----- | --- |
| Ink | `#101218` |
| Panel | `#1a1f28` |
| Line | `#2d3542` |
| Muted | `#7c8696` |
| Cream | `#e9edf3` |
| Accent | `#6fa3d8` |

## Sequence

| Step | Duration |
| ---- | -------- |
| Anchor node 6px | 60ms |
| Boundary → 188×176px | 180ms |
| Row reveal stagger | 35ms each |
| Dismiss collapse | 150ms |

Menu offset from anchor: **10px**. Transform origin: top right (trailing edge).

## API

- `openContextMenuBloom()`
- `dismissContextMenuBloom()`

## Reduced motion

Menu appears/disappears immediately at anchored position with all four rows
visible.

## Accessibility

- Source `aria-haspopup="menu"` / `aria-expanded`
- Menu `role="menu"`; items `role="menuitem"`
- Arrow keys cycle active item; ESC dismisses and restores focus to source
- Status announcements via `aria-live="polite"`
