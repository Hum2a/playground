# Invalid Drop Return (portable recreation spec)

Focus on return physics of a rejected drag. 220×70 task card with INBOX (valid)
and LOCKED (invalid) targets.

## DOM structure

```html
<div class="aidr" data-android-invalid-drop-return>
  <article class="aidr__card" data-aidr-source>TASK // REVIEW</article>
  <div class="aidr__target--valid" data-aidr-valid>INBOX</div>
  <div class="aidr__target--invalid" data-aidr-invalid>LOCKED</div>
  <div class="aidr__proxy" data-aidr-proxy hidden>…</div>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Task card | `220 × 70px` |
| Invalid flash | `90ms` boundary cue on LOCKED |
| Return duration | `260ms` with overshoot capped `6px` |
| Placeholder | remains until return finishes |
| Valid drop | absorption, no return |

## Reduced motion

Invalid cue then instant proxy restore to source.

## API

- `resetAndroidInvalidDropReturn()`
