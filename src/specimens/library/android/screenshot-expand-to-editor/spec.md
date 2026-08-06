# Screenshot Expand to Editor (portable recreation spec)

116×206 thumbnail at bottom-left transforms into centred 358×620 editor over 380ms.

## Contract

| Parameter | Value |
| --------- | ----- |
| Thumbnail | `116 × 206px`, radius `18px` |
| Editor | `358 × 620px`, radius `26px` |
| Duration | `380ms` |
| Controls delay | `180ms` after expansion |

## Reduced motion

Immediate geometry switch.

## API

- `resetScreenshotExpandToEditor()`
