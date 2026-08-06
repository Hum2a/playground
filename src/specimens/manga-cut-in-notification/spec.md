# Manga Cut-In Notification (portable recreation spec)

Interruptive notification that opens from a narrow diagonal slit into a graphic
comic strip. Inspired by manga/anime cut-in language and Persona 5 interruptions —
no character portraits, logos, or copied layouts. Rebuild from this document,
`demo.css`, `demo.js`, and `contract.json`.

## Visual intent

- Begins as a ~2px diagonal slit that attacks left→right (~100ms)
- Opens vertically into ~110px strip (~200ms) via clip expansion — not a fade
- Black/red backings misregistered by ~7×6px
- Text enters from different directions/times; headline overshoots ~8px
- Hold still ~900ms; exit collapses to slit then retracts (not perfect reverse)
- Host splits ±3px during open, returns on close

## DOM structure

```html
<div class="manga-cut-in-host" data-manga-cut-in-host>
  <div class="manga-cut-in-host__upper">…</div>
  <div class="manga-cut-in-host__lower">
    <button data-manga-cut-in-trigger>COMPLETE BUILD</button>
  </div>
  <div class="manga-cut-in" data-manga-cut-in hidden>
    <div class="manga-cut-in__strip">
      <div class="manga-cut-in__backing manga-cut-in__backing--red"></div>
      <div class="manga-cut-in__backing manga-cut-in__backing--black"></div>
      <span class="manga-cut-in__shard …"></span>
      <div class="manga-cut-in__body" aria-hidden="true">
        SYSTEM / BUILD COMPLETE! / 12 artifacts compiled
      </div>
    </div>
    <p class="manga-cut-in__status" role="status" aria-live="polite"></p>
  </div>
</div>
```

Host clips overflow. Strip: `width: 120%`, `left: -10%`, `rotate(-3deg)`, height 110px.

## Colours

| Token | Hex |
| --- | --- |
| Black | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Timing (frozen)

| Phase | Duration |
| --- | --- |
| Slit attack | 100ms |
| Open expand | 200ms |
| Content entrance | 200ms (headline +50ms) |
| Hold | 900ms |
| Exit | 260ms |

## Motion notes

- Slit: `clip-path` inset grows horizontally across a 2px band
- Open: vertical inset expands to full strip height
- Content: SYSTEM from left; BUILD COMPLETE! from right with −8px overshoot; meta last
- Exit: text leaves opposite directions; strip collapses to 2px then retracts right
- Host: `--split` applies translateY(±3px) on upper/lower during open

## Accessibility

- One polite live region: `Build complete. 12 artifacts compiled.`
- Decorative strip typography is `aria-hidden`
- Reduced motion: static strip immediately; no slit/text travel/host split; clear without exit motion

## Integration

- Parent: `position: relative; overflow: hidden`
- Import `demo.css` verbatim
- Call `fireMangaCutIn` / `replayMangaCutIn`
- No external assets, libraries, or network
