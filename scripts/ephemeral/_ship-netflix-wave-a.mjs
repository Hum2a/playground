import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

execSync('node scripts/_gen-netflix-wave-a.mjs', { stdio: 'inherit' })

const batch = [
  {
    id: 'neighbour-push-out',
    spx: 'SPX-3147',
    nf: 'NF-038',
    title: 'Neighbour Push-Out',
    exportName: 'neighbourPushOut',
  },
  {
    id: 'preview-collapse-return',
    spx: 'SPX-3149',
    nf: 'NF-040',
    title: 'Preview Collapse Return',
    exportName: 'previewCollapseReturn',
  },
  {
    id: 'horizontal-content-rail',
    spx: 'SPX-3134',
    nf: 'NF-025',
    title: 'Horizontal Content Rail',
    exportName: 'horizontalContentRail',
  },
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

for (const s of batch) {
  const before = findBefore(s.id)
  console.log('shipping', s.id, 'before', before.folder)
  execSync(
    `node scripts/_ship-netflix-specimen.mjs ${s.id} ${s.spx} ${s.nf} "${s.title}" ${s.exportName} ${before.exportName} ${before.folder}`,
    { stdio: 'inherit' },
  )
}
