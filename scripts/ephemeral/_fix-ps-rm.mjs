import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..', 'src', 'specimens')
const map = {
  'activity-card-focus': 'acf',
  'home-game-focus-shift': 'hgfs',
  'context-background-crossfade': 'cbc',
  'home-to-game-handoff': 'htgh',
  'system-boot-glow': 'sbg',
  'game-launch-zoom': 'glz',
  'resume-activity-handoff': 'rah',
  'directional-focus-travel': 'dft',
  'focus-halo-settle': 'fhs',
}

for (const [dir, p] of Object.entries(map)) {
  const file = join(ROOT, dir, 'demo.css')
  let css = readFileSync(file, 'utf8')
  const bad = `[data-force-reduced-motion='true'] .${p} [data-animate], .${p}__animated`
  const good = `[data-force-reduced-motion='true'] .${p} [data-animate],\n[data-force-reduced-motion='true'] .${p}__animated`
  if (css.includes(bad)) {
    css = css.replace(bad, good)
    writeFileSync(file, css)
    writeFileSync(join(ROOT, dir, 'demo.style.txt'), css)
    console.log('fixed', dir)
  }
}
