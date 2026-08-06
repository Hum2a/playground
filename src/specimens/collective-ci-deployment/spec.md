# Collective CI Deployment (portable recreation spec)

Distributed CI completion: six independent jobs finish on a frozen schedule.
Each emits one diamond result token into a central RELEASE artifact that grows
only on token arrival. DEPLOY unlocks at 6/6 — readiness, not auto-deploy.
No images, audio, network, or storage.

## Visual intent

Parallel RUNNING jobs → staggered PASSED → token travel → aggregation →
6/6 READY. PACKAGE contributes last. Final state is fully static.

## DOM structure

```html
<div class="cci" data-collective-ci data-phase="idle" data-ready="0">
  <p>RELEASE // 2.4.0</p>
  <div class="cci__stage">
    <svg><!-- 6 frozen link paths --></svg>
    <!-- 6 jobs: LINT UNIT BUILD E2E SECURITY PACKAGE -->
    <div class="cci__release">RELEASE artifact</div>
    <div class="cci__tokens"></div>
  </div>
  <p>READY 0 / 6 · DEPLOYMENT LOCKED</p>
  <button data-cci-run>RUN PIPELINE</button>
  <button data-cci-deploy disabled>DEPLOY</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Pipeline | `RELEASE // 2.4.0` |
| Jobs | LINT · UNIT · BUILD · E2E · SECURITY · PACKAGE |
| Running | `RUNNING` |
| Passed | `PASSED` |
| Deploy locked | `LOCKED` |
| Deploy ready | `READY` |
| Trigger | `RUN PIPELINE` |
| Action | `DEPLOY` (disabled until 6/6) |

## Colours

| Token | Hex |
| ----- | --- |
| Ink | `#0c1218` |
| Cream | `#e8eef4` |
| Muted | `#7a8b9c` |
| Blue | `#3d8fd1` |
| Cyan | `#6ec8f0` |
| Pass | `#4a9e6e` |
| Ready | `#c4a035` |

## Job schedule (from RUN, frozen)

| Job | Complete at |
| --- | ----------- |
| LINT | 420ms |
| UNIT | 680ms |
| BUILD | 920ms |
| E2E | 1240ms |
| SECURITY | 1510ms |
| PACKAGE | 1780ms |

No random durations. RUNNING may show a restrained pulse; it stops on PASSED.
Reduced motion removes the pulse entirely.

## Completion → aggregation

1. Job status: `RUNNING → PASSED`
2. Exactly one diamond token emerges
3. Token travels ~240ms along its frozen path
4. Only on arrival: artifact grows and readiness increments

## Artifact sizes (px)

`34 → 42 → 50 → 58 → 66 → 74 → 86`

Initial 34; six arrivals reach 86. Growth happens only on token arrival —
PASSED alone does not grow the artifact.

## Readiness & deploy

- Counter: `0 / 6` → `6 / 6`
- After PACKAGE token arrives: six connection lines lit, `LOCKED → READY`
- DEPLOY enables only at 6/6; clicking does not execute deploy

## Frozen paths (viewBox 400×320)

| Job | `d` |
| --- | --- |
| lint | `M 60 58 C 110 90, 160 140, 200 160` |
| unit | `M 60 160 C 110 160, 150 160, 200 160` |
| build | `M 60 262 C 110 230, 160 180, 200 160` |
| e2e | `M 340 58 C 290 90, 240 140, 200 160` |
| security | `M 340 160 C 290 160, 250 160, 200 160` |
| package | `M 340 262 C 290 230, 240 180, 200 160` |

## API

- `runCollectiveCi()`
- `resetCollectiveCi()`
- `replayCollectiveCi()`

## Reduced motion

Immediately show all jobs PASSED, `6 / 6`, deployment READY, six links, DEPLOY enabled.

## Accessibility

Every job state is normal text. Readiness and deployment state are readable.
Polite status announces idle / running / ready — not each intermediate token.
