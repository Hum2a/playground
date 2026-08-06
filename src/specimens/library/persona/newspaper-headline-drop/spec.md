# Newspaper Headline Drop (portable recreation spec)

Interruptive announcement: an oversized newsprint headline strip drops abruptly onto a
host surface, overshoots, rebounds, and settles crooked. Dismiss ejects the strip
sideways. Rebuild from this document, `demo.css`, `demo.js`, and `contract.json`.
No copyrighted Persona newspapers, logos, fonts, or extracted imagery.

## Visual intent

- Persona 5–inspired print / collage interruption language (original geometry and copy)
- Wide newsprint strip (`#eee9da`) with ink (`#101010`) and red (`#cf1723`) accents
- Heavy vertical drop with visible impact overshoot and short rebound
- Host content nudges down exactly **3px** for ~70ms at impact — not prolonged shake
- Two–three tiny ink/paper impact marks flash near the strip’s lower edge
- Sideways dismiss (`translateX(125%)`) — must not reverse the entrance
- Overlay announcement is semantic (`role="alert"`); decorative scraps/marks are `aria-hidden`

## DOM structure

```html
<div class="newspaper-drop-demo" data-newspaper-drop-demo>
  <div class="newspaper-drop-demo__host" data-newspaper-drop-host>
    … neutral copy …
    <button data-newspaper-drop-trigger>BREAK NEWS</button>
  </div>
  <div class="newspaper-drop" data-newspaper-drop aria-hidden="true">
    <div class="newspaper-drop__strip" role="alert">
      <p class="newspaper-drop__pub">ARCHIVE DAILY</p>
      <h2 class="newspaper-drop__headline">NEW SPECIMEN DISCOVERED</h2>
      <div class="newspaper-drop__rule" aria-hidden="true"></div>
      <p class="newspaper-drop__meta">ISSUE 07 // 14:32</p>
      <div class="newspaper-drop__scraps" aria-hidden="true">…</div>
      <button data-newspaper-drop-dismiss>Dismiss</button>
    </div>
    <div class="newspaper-drop__marks" aria-hidden="true">…</div>
  </div>
</div>
<button data-newspaper-drop-replay>Replay</button>
```

Host: relative, `overflow: hidden`. Idle strip sits above the frame via `translateY(-135%)`.

## Strip geometry

| Token | Value |
| ----- | ----- |
| Width | `116%` |
| Left | `-8%` |
| Height | `170px` |
| Settle rotation | `-2deg` |
| Border radius | `0` |
| Clip-path | `polygon(0% 4%, 98% 0%, 100% 12%, 99% 88%, 100% 100%, 2% 97%, 0% 78%, 1% 22%)` |

## Timing

Total entrance **480ms**.

| Phase | Window (ms) | Transform |
| ----- | ----------- | --------- |
| Fall | 0–300 | `-135%/5deg` → `5%/-3deg` (accelerate) |
| Rebound | 300–390 | → `-2%/-1deg` |
| Settle | 390–480 | → `0/-2deg` |
| Host nudge | at 300, 70ms | `translateY(3px)` then 0 |
| Marks | at impact, ~160ms | flash then clear |
| Dismiss | 340ms | → `translate(125%, -8%) rotate(7deg)` |

Fall easing: `cubic-bezier(0.55, 0.05, 0.8, 0.4)`. Drive with `.newspaper-drop--enter`,
`.newspaper-drop--impact`, `.newspaper-drop--settled`, `.newspaper-drop--exit`.

## API

```js
dropNewspaperHeadline()
dismissNewspaperHeadline()
replayNewspaperHeadline()
```

Busy-guarded; replay dismisses first if settled. Harness `{ type: 'restart' }` retriggers.
Sandbox-safe: no `parent`, storage, or network.

## Reduced motion

Under `prefers-reduced-motion: reduce` **or** `data-force-reduced-motion="true"`:

- Immediately show settled strip at `-2deg`
- No fall, rebound, host nudge, or marks
- Dismiss clears instantly

## Accessibility

- Strip is the single semantic announcement (`role="alert"`)
- Root `aria-hidden` while idle; cleared while announcing
- Marks and column scraps: `aria-hidden`
- Dismiss / BREAK NEWS / Replay are focusable with visible focus rings

## Porting

1. Copy `demo.css` verbatim (and `demo.js` or reimplement the tiny API)
2. Mount inside a relative overflow-clipped host
3. Call `dropNewspaperHeadline` from your trigger; honour both reduced-motion paths
