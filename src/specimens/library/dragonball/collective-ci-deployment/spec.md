# Collective CI Deployment (portable recreation spec)

Distributed CI completion as a radial charge: six job nodes orbit a central
deployment mass. Each PASSED job emits one charge orb along a frozen curved
path; the RELEASE sphere grows only on arrival. DEPLOY unlocks at 6/6 —
readiness, not auto-deploy.

## Visual intent

Circular arena with dashed inner ring and outer orbit. Job nodes are round
capsules on the perimeter — not rectangular checklist cards. A luminous
central sphere accumulates charge; paths light green on connection. Final
state is fully static gold mass at 6/6.

## DOM structure

```html
<div class="cci" data-collective-ci data-phase="idle" data-ready="0">
  <p>RELEASE // 2.4.0</p>
  <div class="cci__arena">
    <span class="cci__ring">…</span>
    <svg><!-- 6 radial link paths --></svg>
    <!-- 6 cci__node orbit capsules -->
    <div class="cci__mass"><span data-cci-artifact></span></div>
    <div class="cci__tokens"></div>
  </div>
  <p>CHARGE 0 / 6 · DEPLOYMENT LOCKED</p>
  <button data-cci-run>RUN PIPELINE</button>
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
| Charge counter | `CHARGE 0 / 6` → `6 / 6` |
| Trigger | `RUN PIPELINE` |
| Action | `DEPLOY` (disabled until 6/6) |

## Colours

| Token | Hex |
| ----- | --- |
| Void | `#080c14` |
| Cream | `#e8eef4` |
| Muted | `#6a7d94` |
| Charge | `#5ec8f0` |
| Core | `#3d8fd1` |
| Pass | `#4a9e6e` |
| Ready | `#e8c040` |

## Job schedule (from RUN, frozen)

| Job | Complete at |
| --- | ----------- |
| LINT | 420ms |
| UNIT | 680ms |
| BUILD | 920ms |
| E2E | 1240ms |
| SECURITY | 1510ms |
| PACKAGE | 1780ms |

## Completion → aggregation

1. Job status: `RUNNING → PASSED`
2. Exactly one charge orb emerges
3. Orb travels 240ms along its frozen radial path
4. Only on arrival: deployment mass grows and CHARGE increments

## Deployment mass sizes (px)

`34 → 42 → 50 → 58 → 66 → 74 → 86`

Initial 34; six arrivals reach 86. Growth happens only on orb arrival.

## Frozen paths (viewBox 400×400, centre 200,200)

| Job | `d` |
| --- | --- |
| lint | `M 120 61 C 150 90, 175 140, 200 200` |
| unit | `M 40 200 C 90 200, 140 200, 200 200` |
| build | `M 120 339 C 150 290, 175 240, 200 200` |
| e2e | `M 280 61 C 250 90, 225 140, 200 200` |
| security | `M 360 200 C 310 200, 260 200, 200 200` |
| package | `M 280 339 C 250 290, 225 240, 200 200` |

## API

- `runCollectiveCi()`
- `resetCollectiveCi()`
- `replayCollectiveCi()`
- `COLLECTIVE_CI_TIMING` export

## Reduced motion

Immediately show all jobs PASSED, `6 / 6`, deployment READY, six links, DEPLOY enabled.

## Accessibility

Every job state is normal text. CHARGE and deployment state are readable.
Polite status announces idle / running / ready.
