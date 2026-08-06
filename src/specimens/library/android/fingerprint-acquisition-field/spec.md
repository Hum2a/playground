# Fingerprint Acquisition Field (portable recreation spec)

280×360 auth card with 88×88 hold target and 12 arc segments lighting over 900ms.

## Layout contract

| Token | Value |
| ----- | ----- |
| Card | 280px wide |
| Target | 88 × 88px |
| Segments | 12 |
| Hold duration | 900ms |
| Rewind before | 720ms |
| Failure pulse | 220ms |

## API

- `resetFingerprintAcquisitionField()`

## Reduced motion

Segments change in discrete stages; no pulsing or scaling.
