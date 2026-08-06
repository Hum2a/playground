# Permission Rejection (portable recreation spec)

Blocked-action feedback: a restricted control lunges toward activation, hits a
diagonal graphic barrier, compresses once, recoils once, and an `ACCESS DENIED`
label attacks above. Rebuild from this document, `demo.css`, and `contract.json`.
No copyrighted Persona assets, fonts, or logos.

## Visual intent

- Control appears to attempt activation, then is physically rejected
- Barrier arrives before the attempt completes
- One recoil only — do not repeatedly shake
- Underlying action stays logically unavailable

## DOM structure

```html
<div class="perm-reject" data-permission-rejection data-phase="idle">
  <article class="perm-reject__card">
    <p class="perm-reject__state">RESTRICTED</p>
    <h2 class="perm-reject__title">ADMIN ARCHIVE</h2>
    <div class="perm-reject__stage">
      <button class="perm-reject__action" data-pr-action aria-disabled="true">
        OPEN ARCHIVE
      </button>
      <div class="perm-reject__barrier" aria-hidden="true">…</div>
      <span class="perm-reject__mark perm-reject__mark--1|2|3" aria-hidden="true"></span>
      <p class="perm-reject__denied" aria-hidden="true">ACCESS DENIED</p>
    </div>
  </article>
  <!-- demo controls + status live region -->
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Title | `ADMIN ARCHIVE` |
| Action | `OPEN ARCHIVE` |
| State | `RESTRICTED` |
| Denied | `ACCESS DENIED` |
| SR announce | `Access denied. Admin Archive is restricted.` |

## Colours

| Token | Hex |
| ----- | --- |
| Black | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Frozen motion

| Phase | Timing | Transform / notes |
| ----- | ------ | ----------------- |
| Attempt | **80ms** | `translateX(8px)` |
| Barrier slam | starts ~**20ms** into attempt, ~**70ms** | Width **14px**, height **~130%**, rotate **12deg**, red face + black offset |
| Collide | **60ms** | `translateX(8px) scaleX(0.96)` + **3** angular impact marks |
| Recoil | **140ms** | to `translateX(-10px)` then settle `translateX(0)` — **one** recoil |
| Denied in | **180ms** at collision | Attacks above target (~−6deg) |
| Denied hold | **~800ms** | Remains visible |
| Clear | **~160ms** | Denied + barrier retract |

Total animated sequence before clear ≈ **280ms** motion + **800ms** hold.

## Reduced motion

Honour both:

- `@media (prefers-reduced-motion: reduce)`
- `[data-force-reduced-motion="true"]`

No forward travel, barrier slam, compress, or recoil. Immediately show static
barrier + `ACCESS DENIED`, announce denial, then clear after a short hold.

## Accessibility

- Announce: **Access denied. Admin Archive is restricted.**
- Do not imply the action succeeded
- Decorative barrier, marks, and stamp backing: `aria-hidden`
- Keep `OPEN ARCHIVE` unavailable (`aria-disabled` / disabled semantics)

## Porting checklist

1. Copy markup + CSS (palette, transforms, phase timings)
2. Wire `runPermissionRejection` / `resetPermissionRejection`
3. Keep the real action gated in application logic
4. Verify one recoil only and both reduced-motion triggers
5. Confirm exact transforms match the contract
