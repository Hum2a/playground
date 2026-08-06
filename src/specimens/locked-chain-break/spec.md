# Locked Chain Break (portable recreation spec)

Unlock animation: a restricted content card is held shut by seven interlocking angular
graphic chain links. On grant, tension builds, the centre link fractures, left/right
segments recoil, and the underlying chapter unlocks. Rebuild from this document,
`demo.css`, `demo.js`, and `contract.json`. No photoreal metal or external chain assets.

## Visual intent

- Abstract Persona 5–inspired graphic geometry (original shapes)
- Black (`#090909`) / red (`#e60012`) / paper (`#f5f1e8`)
- Seven angular links (~42×24px) alternating ±18° with overlap
- Chain crosses ~52% vertical; LOCKED badge overlays centre
- OPEN CHAPTER stays `disabled` until unlock — not pointer-blocking alone

## DOM structure

```html
<div class="locked-chain-demo" data-locked-chain-demo>
  <div data-locked-chain-host>
    <div data-locked-chain-content>… Chapter 12 / ADVANCED MATERIAL / OPEN CHAPTER …</div>
    <div class="locked-chain" data-locked-chain aria-hidden="true">
      <div class="locked-chain__seg--left">links 1–3</div>
      <div class="locked-chain__seg--centre">link 4 + pieces + frags</div>
      <div class="locked-chain__seg--right">links 5–7</div>
      <div class="locked-chain__badge">LOCKED</div>
    </div>
  </div>
  <p data-locked-chain-status aria-live="polite">Locked</p>
  <button data-locked-chain-grant>GRANT ACCESS</button>
  <button data-locked-chain-reset>Reset</button>
</div>
```

## Link geometry

| Token | Value |
| ----- | ----- |
| Size | 42×24px |
| Overlap | −7px margin |
| Clip-path | `polygon(8% 0%, 92% 0%, 100% 35%, 92% 100%, 8% 100%, 0% 65%)` |
| Rotations | −18 / 18 / −18 / 18 / −18 / 18 / −18 |
| Red backing | links 2 and 6 |

## Timing

| Phase | Window (ms) | Notes |
| ----- | ----------- | ----- |
| Tension | 0–180 | halves ±3px; centre scaleX 1.08; badge scaleX .96; red tension marks |
| Fracture | 180–300 | centre splits; pieces −12/−8 −14deg and +14/+10 +16deg; 3 frags |
| Recoil | 260–560 | left −125%/−8deg; right +125%/+9deg |
| Label | 280 + 240 | red diagonal slash; exit translateY 70px rotate 8deg |
| Content | on unlock | scale .98→1; ACCESS GRANTED |

## API

```js
breakLockedChain()
resetLockedChain()
```

Busy-guarded. Announce unlock via `aria-live`. Harness `{ type: 'restart' }` resets.

## Reduced motion

Under `prefers-reduced-motion: reduce` **or** `data-force-reduced-motion="true"`:
immediately hide chain and expose unlocked state — no tension/fracture/recoil.

## Accessibility

- Semantic status: Locked → Access granted. Advanced Material unlocked.
- Decorative chain / fragments / slash: `aria-hidden`
- Action button disabled while locked

## Porting

1. Copy `demo.css` / `demo.js` verbatim
2. Keep underlay content in the DOM for the whole effect
3. Disable primary action until unlock; honour both RM triggers
