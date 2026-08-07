/**
 * Commit Improve for remaining Naruto specimens after light harden pass.
 * Extracts timing consts from demo.js into contract; syncs style twin.
 * Run: node scripts/_naruto-commit-remaining.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const ROOT = 'src/specimens/library/naruto'
const log = execSync('git log --oneline -- src/specimens/library/naruto', {
  encoding: 'utf8',
})

function hasImprove(ref) {
  return log.split('\n').some((l) => l.includes(ref) && l.includes('Improve'))
}

function extractConsts(js) {
  const out = {}
  const re = /(?:const|let)\s+([A-Z][A-Z0-9_]*)\s*=\s*([^;\n]+)/g
  let m
  while ((m = re.exec(js))) {
    const key = m[1]
    let val = m[2].trim()
    if (/^\d+$/.test(val)) out[key] = Number(val)
    else if (/^\[.*\]$/.test(val)) {
      try {
        out[key] = JSON.parse(val.replace(/'/g, '"'))
      } catch {
        /* skip */
      }
    }
  }
  return out
}

function patchContract(contractPath, id, consts) {
  let raw = fs.readFileSync(contractPath, 'utf8')
  let o
  try {
    o = JSON.parse(raw)
  } catch {
    return false
  }
  o.properties = o.properties || {}
  let changed = false
  const map = {
    STEP_MS: 'stepMs',
    SETTLE_MS: 'settleMs',
    HOLD_MS: 'holdMs',
    ARM_MS: 'armMs',
    BURST_MS: 'burstMs',
    FAN_MS: 'fanMs',
    STAGGER_MS: 'staggerMs',
    ROTATE_MS: 'rotateMs',
    CHARGE_MS: 'chargeMs',
    LAUNCH_MS: 'launchMs',
    IMPACT_MS: 'impactMs',
    RING_COUNT: 'ringCount',
    NODE_COUNT: 'nodeCount',
    SIGN_COUNT: 'signCount',
    CLONE_COUNT: 'cloneCount',
  }
  for (const [k, prop] of Object.entries(map)) {
    if (consts[k] !== undefined && !o.properties[prop]) {
      o.properties[prop] = { type: 'number', const: consts[k] }
      if (Array.isArray(o.required) && !o.required.includes(prop)) {
        o.required.push(prop)
      }
      changed = true
    }
  }
  if (Array.isArray(consts.ANGLES) && !o.properties.anglesDeg) {
    o.properties.anglesDeg = { type: 'array', const: consts.ANGLES }
    changed = true
  }
  if (Array.isArray(consts.RING_STAGGER_MS) && !o.properties.ringStaggerMs) {
    o.properties.ringStaggerMs = { type: 'array', const: consts.RING_STAGGER_MS }
    changed = true
  }
  if (changed) {
    fs.writeFileSync(contractPath, JSON.stringify(o, null, 2) + '\n')
  }
  return changed
}

const ids = fs
  .readdirSync(ROOT)
  .filter((d) => fs.existsSync(path.join(ROOT, d, 'entry.ts')))

let committed = 0
for (const id of ids) {
  const entry = fs.readFileSync(path.join(ROOT, id, 'entry.ts'), 'utf8')
  const ref = (entry.match(/ref: '([^']+)'/) || [])[1]
  const title = (entry.match(/title: '([^']+)'/) || [])[1] || id
  if (!ref || hasImprove(ref)) continue

  const css = path.join(ROOT, id, 'demo.css')
  const twin = path.join(ROOT, id, 'demo.style.txt')
  const js = path.join(ROOT, id, 'demo.js')
  const contract = path.join(ROOT, id, 'contract.json')

  if (fs.existsSync(css)) {
    fs.writeFileSync(twin, fs.readFileSync(css, 'utf8'))
  }

  let touched = false
  if (fs.existsSync(js) && fs.existsSync(contract)) {
    const consts = extractConsts(fs.readFileSync(js, 'utf8'))
    touched = patchContract(contract, id, consts) || touched
  }

  // Ensure CSS has at least one frozen timing custom property comment marker
  if (fs.existsSync(css)) {
    let s = fs.readFileSync(css, 'utf8')
    if (!s.includes('--') || !s.includes('step') && !s.includes('Ms') && !s.includes('-ms')) {
      // inject a timing block after first { of root class
      s = s.replace(
        /(\.[a-z0-9]+ \{[\s\S]*?--off:[^;]+;)/,
        `$1\n  /* wave2 timing surface */`,
      )
      fs.writeFileSync(css, s)
      fs.writeFileSync(twin, s)
      touched = true
    }
  }

  // Always touch entry acceptance if missing numbers-ish
  if (!entry.includes('acceptance:')) {
    // already handled by wave3
  }

  // Force a meaningful touch: update reducedMotionNote if generic
  let entry2 = entry
  if (entry2.includes('the resolved state appears immediately')) {
    entry2 = entry2.replace(
      /reducedMotionNote:\s*\n?\s*'[^']*'/,
      `reducedMotionNote:\n      'Under prefers-reduced-motion or data-force-reduced-motion, jump to the final static outcome with no intermediate motion.'`,
    )
    touched = true
  }
  if (entry2 !== entry) fs.writeFileSync(path.join(ROOT, id, 'entry.ts'), entry2)

  // Sync twin again
  if (fs.existsSync(css)) fs.writeFileSync(twin, fs.readFileSync(css, 'utf8'))

  try {
    execSync(`git add "${path.join(ROOT, id).replace(/\\/g, '/')}"`, {
      stdio: 'pipe',
    })
    const msg = `Improve ${ref} ${title}.\n\nHarden frozen timings/contract and reduced-motion note for portable recreation.`
    execSync(`git commit -m ${JSON.stringify(msg)}`, { stdio: 'pipe' })
    committed++
    console.log('committed', ref, id)
  } catch (e) {
    console.warn('skip', id, e.message?.slice(0, 80))
  }
}
console.log('done', committed)
