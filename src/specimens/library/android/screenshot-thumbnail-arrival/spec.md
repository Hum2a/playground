# Screenshot Thumbnail Arrival (portable recreation spec)

390×420 Gallery app. Capture flashes white 70ms, then a 116×206 miniature
thumbnail enters from scale 0.72 / translateY 36px over 300ms at bottom-left.
Dwell 4200ms then slides offscreen. Tap opens editor and pauses timeout.

## Contract

| Parameter | Value |
| --------- | ----- |
| Thumbnail | `116 × 206px`, 16px inset |
| Flash | `70ms` |
| Arrival | `300ms` |
| Dwell | `4200ms` |
| Representation | prebuilt DOM miniature |

## Reduced motion

Omit flash and travel; thumbnail appears in place.

## API

- `resetScreenshotThumbnailArrival()`
