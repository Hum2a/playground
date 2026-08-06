# Persona Awakening Reveal (portable recreation spec)

Unlock / transformation: a restrained `UNKNOWN` identity trapped behind a dark-blue
glass shell develops internal pressure, fractures, and breaks open to reveal a
still `AWAKENED` state. Inspired by Persona 3 themes of awakening and blue
spectral energy — not a game replica. No character imagery, Persona cards, masks,
logos, or copied summon art.

## Visual intent

contained identity → internal pressure → fracture → revelation → stable empowered state

Final stillness is required: no perpetual aura, pulsing energy, or floating fragments.

## DOM structure

```html
<div class="par" data-persona-awakening data-phase="idle">
  <div class="par__stage">
    <div class="par__identity">
      <p>IDENTITY</p>
      <h2>UNKNOWN → AWAKENED</h2>
      <p>SIGNATURE // ??? → BLUE</p>
    </div>
    <div class="par__shell" aria-hidden="true">
      <!-- 5 panels, 3 seams, 4 fractures, breach, 5 streaks -->
    </div>
    <div class="par__frame" aria-hidden="true"><!-- 4 segments --></div>
  </div>
  <button data-par-awaken>AWAKEN</button>
</div>
```

## Copy

| State | Small | Large | Secondary |
| ----- | ----- | ----- | --------- |
| Initial | `IDENTITY` | `UNKNOWN` | `SIGNATURE // ???` |
| Final | `IDENTITY` | `AWAKENED` | `SIGNATURE // BLUE` |
| Trigger | | `AWAKEN` | |

SR: `Identity unknown.` → `Identity awakened. Signature Blue.`

## Colours

| Token | Hex |
| ----- | --- |
| Near-black | `#020a14` |
| Deep blue | `#08213a` |
| Energy | `#168ac2` |
| Bright | `#59c8f2` |
| Pale | `#d9f7ff` |
| White | `#f6fcff` |

## Shell polygons (five regions)

| Panel | Role | clip-path |
| ----- | ---- | --------- |
| 1 | upper-left | `polygon(0% 0%, 52% 0%, 48% 38%, 0% 46%)` |
| 2 | upper-right | `polygon(52% 0%, 100% 0%, 100% 42%, 58% 36%, 48% 38%)` |
| 3 | centre-left | `polygon(0% 46%, 48% 38%, 44% 68%, 0% 78%)` |
| 4 | centre-right | `polygon(48% 38%, 58% 36%, 100% 42%, 100% 76%, 54% 70%, 44% 68%)` |
| 5 | lower | `polygon(0% 78%, 44% 68%, 54% 70%, 100% 76%, 100% 100%, 0% 100%)` |

## Frozen motion (~1000ms)

| Phase | Window | Notes |
| ----- | ------ | ----- |
| Pressure | 0–220ms | 3 narrow pale seam glows; host scale `1 → 1.015` |
| Fracture | 180–420ms | Seams widen; **4** angular fractures from **47% 54%** |
| Breach | ~360ms | Pale central shape `scale(0.2 → 1.1)` over ~180ms; shell stays foreground |
| Separate | 420–720ms | Five panels fly out (see transforms); **5** energy streaks then vanish |
| Reveal | ~260ms into separate | Identity `scale(0.96 → 1.03 → 1)` |
| Frame | ~60–90ms each | Four angular segments assemble |
| Settled | ~720ms+ | Completely still |

### Separation transforms

| Panel | translate / rotate |
| ----- | ------------------ |
| 1 upper-left | `-70px -55px` / `-10deg` |
| 2 upper-right | `65px -60px` / `9deg` |
| 3 centre-left | `-95px 4px` / `-6deg` |
| 4 centre-right | `90px 8px` / `8deg` |
| 5 lower | `5px 85px` / `4deg` |

## Reduced motion

Honour both `prefers-reduced-motion: reduce` and `data-force-reduced-motion="true"`.
Immediately show `AWAKENED` with static angular blue frame — no fracture, separation, or streak travel.

## Accessibility

- Shell, seams, fractures, breach, streaks: decorative (`aria-hidden`)
- Announce locked → awakened state via `aria-live`
- Do not imply success until settled copy is announced

## Porting checklist

1. Copy markup + CSS (palette, polygons, transforms, timings)
2. Keep underlay identity in the DOM; swap copy while still covered
3. Wire `runPersonaAwakening` / `resetPersonaAwakening`
4. Verify stillness after settle and both reduced-motion triggers
5. Confirm no character / logo / mask assets
