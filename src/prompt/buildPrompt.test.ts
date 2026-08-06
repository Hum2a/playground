import { describe, expect, it } from 'vitest'
import { comingSoonTape } from '../specimens/coming-soon-tape/entry'
import { resolveSpecimen } from '../specimens/resolvePayload'
import { buildPrompt } from './buildPrompt'

describe('buildPrompt', () => {
  it('builds a full prompt snapshot for SPX-001', async () => {
    const specimen = await resolveSpecimen(comingSoonTape)
    const prompt = buildPrompt(specimen, 'full')
    expect(prompt).toMatchSnapshot()
  })

  it('never mentions this site, this repo, or the word playground', async () => {
    const specimen = await resolveSpecimen(comingSoonTape)
    const prompt = buildPrompt(specimen, 'full').toLowerCase()
    expect(prompt).not.toMatch(/\bplayground\b/)
    expect(prompt).not.toContain('humza-butt')
    expect(prompt).not.toContain('specimen archive')
  })

  it('uses imperative second-person present tense cues', async () => {
    const specimen = await resolveSpecimen(comingSoonTape)
    const prompt = buildPrompt(specimen, 'full')
    expect(prompt).toMatch(/^Add this self-contained/m)
    expect(prompt).toMatch(/Reproduce it exactly/)
    expect(prompt).toMatch(/Do not restyle/)
  })

  it('includes a reduced-motion clause when the specimen respects it', async () => {
    const specimen = await resolveSpecimen(comingSoonTape)
    const prompt = buildPrompt(specimen, 'full')
    expect(prompt.toLowerCase()).toMatch(/reduced motion/)
    expect(prompt).toMatch(/data-force-reduced-motion|prefers-reduced-motion/)
  })

  it('renders acceptance as checklist items and integration as numbered steps', async () => {
    const specimen = await resolveSpecimen(comingSoonTape)
    const prompt = buildPrompt(specimen, 'full')
    expect(prompt).toMatch(/## Acceptance\n(?:- \[ \] .+\n)+/)
    expect(prompt).toMatch(/## Integration\n(?:\d+\. .+\n)+/)
  })

  it('embeds the full specimen CSS in the prompt', async () => {
    const specimen = await resolveSpecimen(comingSoonTape)
    const prompt = buildPrompt(specimen, 'full')
    expect(specimen.files.css.length).toBeGreaterThan(100)
    expect(prompt).toContain('coming-soon-marquee')
    expect(prompt).toContain('rotate(-28deg)')
  })

  it('escalates outer fences when content contains triple backticks', async () => {
    const base = await resolveSpecimen(comingSoonTape)
    const specimen = {
      ...base,
      files: {
        html: '<!-- ```html -->\n<div></div>',
        css: '.x {}',
      },
    }
    const prompt = buildPrompt(specimen, 'full')
    expect(prompt).toContain('````html')
    expect(prompt).toContain('<!-- ```html -->')
  })

  it('returns only fenced markup and styles for code mode', async () => {
    const specimen = await resolveSpecimen(comingSoonTape)
    const prompt = buildPrompt(specimen, 'code')
    expect(prompt).toContain('```html')
    expect(prompt).toContain('```css')
    expect(prompt).not.toContain('## Intent')
    expect(prompt).not.toContain('## Acceptance')
  })

  it('returns pretty-printed JSON for contract mode', async () => {
    const specimen = await resolveSpecimen(comingSoonTape)
    const prompt = buildPrompt(specimen, 'contract')
    expect(JSON.parse(prompt)).toEqual(specimen.contract)
  })
})
