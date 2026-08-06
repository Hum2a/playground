import { execSync } from 'node:child_process'

const batch = [
  {
    id: 'rail-page-snap',
    spx: 'SPX-3136',
    nf: 'NF-027',
    title: 'Rail Page Snap',
    exportName: 'railPageSnap',
  },
  {
    id: 'details-panel-expand',
    spx: 'SPX-3198',
    nf: 'NF-089',
    title: 'Details Panel Expand',
    exportName: 'detailsPanelExpand',
  },
  {
    id: 'playback-controls-fade-in',
    spx: 'SPX-3161',
    nf: 'NF-052',
    title: 'Playback Controls Fade-In',
    exportName: 'playbackControlsFadeIn',
  },
  {
    id: 'scrub-preview-thumbnail',
    spx: 'SPX-3170',
    nf: 'NF-061',
    title: 'Scrub Preview Thumbnail',
    exportName: 'scrubPreviewThumbnail',
  },
  {
    id: 'skip-intro-appear',
    spx: 'SPX-3178',
    nf: 'NF-069',
    title: 'Skip Intro Appear',
    exportName: 'skipIntroAppear',
  },
  {
    id: 'next-episode-countdown',
    spx: 'SPX-3184',
    nf: 'NF-075',
    title: 'Next Episode Countdown',
    exportName: 'nextEpisodeCountdown',
  },
]

function findBefore(id) {
  const index = execSync('git show HEAD:src/specimens/index.ts', {
    encoding: 'utf8',
  })
  const re = /import \{ (\w+) \} from '\.\/([^']+)\/entry'/g
  const rows = []
  let m
  while ((m = re.exec(index))) rows.push({ exportName: m[1], folder: m[2] })
  for (const row of rows) {
    if (row.folder > id) return row
  }
  return rows[rows.length - 1]
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

for (const s of batch) {
  // skip if already in HEAD
  const head = execSync('git show HEAD:src/specimens/index.ts', {
    encoding: 'utf8',
  })
  if (head.includes(s.exportName)) {
    console.log('skip already shipped', s.id)
    continue
  }
  const before = findBefore(s.id)
  console.log('shipping', s.id, 'before', before.folder)
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      execSync(
        `node scripts/_ship-netflix-specimen.mjs ${s.id} ${s.spx} ${s.nf} "${s.title}" ${s.exportName} ${before.exportName} ${before.folder}`,
        { stdio: 'inherit' },
      )
      break
    } catch (e) {
      console.warn('attempt', attempt + 1, 'failed', s.id)
      sleep(3000)
      if (attempt === 4) throw e
    }
  }
}
