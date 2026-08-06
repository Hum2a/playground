# Invalid Field Shake (portable recreation spec)

Finite validation refusal for `PROJECT CODE` field. Invalid `ORBIT?` triggers
exact horizontal offset sequence; valid `ORBIT-7` clears error and shows success
tick.

## Visual intent

300px field. Shake offsets 0, −6, +5, −4, +3, −2, 0 over 310ms. Error boundary
at first negative offset. Inline error expands 0→34px after 90ms. One trailing
error tick. Correct value collapses error and shows success tick.

## DOM structure

```html
<div class="ifs" data-invalid-field-shake>
  <label>PROJECT CODE</label>
  <div class="ifs__field-wrap" data-ifs-wrap>
    <input data-ifs-field value="ORBIT?" />
  </div>
  <div class="ifs__error" data-ifs-error>Use A–Z, 0–9 or -</div>
  <button type="submit">SUBMIT</button>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Field width | 300px |
| Shake offsets | 0, −6, +5, −4, +3, −2, 0 |
| Shake duration | 310ms |
| Error expand delay | 90ms |
| Error height | 34px |
| Valid pattern | A–Z, 0–9, hyphen |

## Reduced motion

No shake; error boundary and message appear immediately.

## API

- `resetInvalidFieldShake()`

## Accessibility

Error region uses `role="alert"`. Status announces validation outcome.

## Porting

Import `demo.css` verbatim. Freeze offset sequence in `contract.json`.
