import { describe, expect, it } from 'vitest'
import { composeSrcDoc } from './composeSrcDoc'

describe('composeSrcDoc', () => {
  it('injects data-force-reduced-motion when requested', () => {
    const doc = composeSrcDoc({
      html: '<div class="x"></div>',
      css: '.x { color: red; }',
      background: 'card',
      forceReducedMotion: true,
    })
    expect(doc).toContain('data-force-reduced-motion="true"')
  })

  it('omits the force attribute when not requested', () => {
    const doc = composeSrcDoc({
      html: '<div></div>',
      css: '',
      background: 'page',
    })
    expect(doc).not.toContain('data-force-reduced-motion')
  })

  it('keeps specimen CSS byte-identical inside its style block', () => {
    const css = `.track { color: #f5c518; }
.track::before { content: "a < b & c"; }
/* not escaped */`
    const doc = composeSrcDoc({
      html: '<div class="track"></div>',
      css,
      background: 'dark',
    })
    const blocks = [...doc.matchAll(/<style>\n([\s\S]*?)\n<\/style>/g)].map((m) => m[1])
    const specimenBlock = blocks.find((b) => b.includes('.track { color: #f5c518; }'))
    expect(specimenBlock).toBe(css)
  })

  it('does not escape angle brackets or ampersands in specimen HTML', () => {
    const html = '<div data-note="a < b & c">ok</div>'
    const doc = composeSrcDoc({
      html,
      css: '',
      background: 'grid',
    })
    expect(doc).toContain(html)
    expect(doc).not.toContain('&lt;')
    expect(doc).not.toContain('&amp;')
  })

  it('wraps specimen HTML with scaffold when provided', () => {
    const doc = composeSrcDoc({
      html: '<div class="tape"></div>',
      css: '',
      background: 'card',
      scaffold: '<div class="card">{{specimen}}</div>',
    })
    expect(doc).toContain('<div class="card"><div class="tape"></div></div>')
  })

  it('includes a module script when js is present', () => {
    const doc = composeSrcDoc({
      html: '<div></div>',
      css: '',
      js: 'console.log("hi")',
      background: 'card',
    })
    expect(doc).toContain('<script type="module">')
    expect(doc).toContain('console.log("hi")')
  })

  it('always includes the playback control script', () => {
    const doc = composeSrcDoc({
      html: '<div></div>',
      css: '',
      background: 'card',
    })
    expect(doc).toContain("data.type === 'playback'")
    expect(doc).toContain("data.type === 'restart'")
    expect(doc).toContain('document.getAnimations()')
  })

  it('sets emulate prefers attribute when requested', () => {
    const doc = composeSrcDoc({
      html: '<div></div>',
      css: '',
      background: 'card',
      emulatePrefersReducedMotion: true,
    })
    expect(doc).toContain('data-emulate-prefers-reduced-motion="true"')
  })
})
