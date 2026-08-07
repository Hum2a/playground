# Rare Trophy Reveal

A **higher-tier** achievement reveal — deliberately unlike
[`trophy-unlock-pop`](../trophy-unlock-pop/spec.md). Sequence:

1. **Veil** — striped conceal overlay thins (`280ms`)
2. **Rays** — six gold-tinted rays bloom while the card enters (`420ms`)
3. **Tier hold** — GOLD badge overshoots and holds (`360ms`)
4. **Done** — settled gold border + soft ray residual (`220ms`)

Not a bottom toast with a shine sweep. Center-stage ceremonial reveal only.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `420 × 360px`, `overflow: hidden` |
| Veil | `280ms` |
| Rays | `420ms` · `6` rays |
| Tier hold | `360ms` |
| Settle | `220ms` |
| Tier | `GOLD` |
| Phases | `idle → veil → rays → tier → done` |
| Accent | `#E8C56A` gold + `#2E90FF` |
| Ink | `#0B0F14` |

## Differentiation vs unlock pop

| Unlock pop | Rare reveal |
| ---------- | ----------- |
| Bottom toast | Center stage card |
| Enter + shine sweep | Veil + rays + tier hold |
| Bronze copy | GOLD badge hold |
| Compact notification | Ceremonial unveil |

## Reduced motion

Honour both `prefers-reduced-motion: reduce` and
`[data-force-reduced-motion="true"]` by skipping veil/rays/tier motion and
showing the settled gold card immediately.

## API

- `runRareTrophyReveal()` — play veil→rays→tier→done
- `resetRareTrophyReveal()` — restore conceal veil
