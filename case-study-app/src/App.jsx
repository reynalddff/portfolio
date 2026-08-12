import { useEffect, useMemo, useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { fetchCaseStudy } from './contentfulClient'
import './App.css'

function textOf(node) {
  if (node.nodeType === 'text') return node.value
  return (node.content || []).map(textOf).join('')
}

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function buildToc(body) {
  const slugs = new WeakMap()
  const items = []
  if (!body?.content) return { slugs, items }
  const seen = new Map()
  for (const node of body.content) {
    // Contentful authors write sections as Heading 1 and sub-sections as Heading 2
    // (the page's one true <h1> is the title, rendered separately from the body).
    if (node.nodeType !== BLOCKS.HEADING_1 && node.nodeType !== BLOCKS.HEADING_2) continue
    const text = textOf(node)
    let id = slugify(text) || 'section'
    const count = seen.get(id) || 0
    seen.set(id, count + 1)
    if (count > 0) id = `${id}-${count}`
    slugs.set(node, id)
    items.push({ id, text, level: node.nodeType === BLOCKS.HEADING_1 ? 2 : 3 })
  }
  return { slugs, items }
}

function useTheme() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])
  return [dark, setDark]
}

function Nav({ dark, setDark }) {
  const [navOpen, setNavOpen] = useState(false)
  return (
    <nav className={navOpen ? 'nav-open' : ''} aria-label="Site">
      <div className="wrap">
        <a className="mark" href="../#top">REYNALD<span>.</span></a>
        <div className="links" id="navLinks">
          <a href="../#top" onClick={() => setNavOpen(false)}>Home</a>
          <a href="../#work" onClick={() => setNavOpen(false)}>Case Study</a>
          <a href="../#profile" onClick={() => setNavOpen(false)}>Profile</a>
          <a href="https://docs.google.com/document/d/1_1jKttusff1OLHlpOVcJbrYGVFzZL4DWwS2hLrMPuPU/edit?tab=t.0" target="_blank" rel="noopener noreferrer" onClick={() => setNavOpen(false)}>Resume</a>
        </div>
        <div className="nav-actions">
          <button
            className="hamburger"
            type="button"
            aria-expanded={navOpen}
            aria-controls="navLinks"
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setNavOpen(o => !o)}
          >
            <span></span><span></span><span></span>
          </button>
          <button
            id="themeBtn"
            type="button"
            aria-pressed={dark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setDark(d => !d)}
          >
            <svg className="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>
            <svg className="i-moon" viewBox="0 0 24 24"><path d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.4 6.4 0 0 0 10.2 10.2Z" /></svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

function Toc({ title, items, activeId, tocOpen, setTocOpen }) {
  return (
    <>
      <div className={`toc-overlay ${tocOpen ? 'open' : ''}`} onClick={() => setTocOpen(false)} />
      <aside className={`toc-panel ${tocOpen ? 'open' : ''}`} id="tocPanel">
        <div className="eyebrow">Table of contents</div>
        <nav aria-label="Table of contents">
          <a className="lvl-h1" href="#top" onClick={() => setTocOpen(false)}>{title}</a>
          {items.map(item => (
            <a key={item.id} className={`lvl-h${item.level} ${activeId === item.id ? 'active' : ''}`.trim()} href={`#${item.id}`} onClick={() => setTocOpen(false)}>
              {item.text}
            </a>
          ))}
        </nav>
      </aside>
    </>
  )
}

function Lightbox({ image, onClose }) {
  if (!image) return null
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" type="button" aria-label="Close image" onClick={onClose}>
        <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <img src={image.src} alt={image.alt} onClick={e => e.stopPropagation()} />
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useTheme()
  const [state, setState] = useState({ status: 'loading', data: null })
  const [activeId, setActiveId] = useState('')
  const [tocOpen, setTocOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [lightboxImage, setLightboxImage] = useState(null)

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('slug')
    if (!slug) {
      setState({ status: 'missing', data: null })
      return
    }
    fetchCaseStudy(slug)
      .then(data => setState(data ? { status: 'ready', data } : { status: 'notfound', data: null }))
      .catch(() => setState({ status: 'error', data: null }))
  }, [])

  const cs = state.status === 'ready' ? state.data : null
  const { slugs: headingSlugs, items: tocItems } = useMemo(() => buildToc(cs?.body), [cs])

  const richTextOptions = useMemo(() => ({
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const file = node.data?.target?.fields?.file
        if (!file?.url) return null
        const src = `https:${file.url}`
        const alt = node.data.target.fields.title || ''
        return <div className="frame"><img src={src} alt={alt} loading="lazy" onClick={() => setLightboxImage({ src, alt })} /></div>
      },
      [BLOCKS.HEADING_1]: (node, children) => <h2 id={headingSlugs.get(node)}>{children}</h2>,
      [BLOCKS.HEADING_2]: (node, children) => <h3 id={headingSlugs.get(node)}>{children}</h3>,
    },
  }), [headingSlugs])

  useEffect(() => {
    if (!cs || tocItems.length === 0) return
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveId(entry.target.id)
      })
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 })
    document.querySelectorAll('#main-content [id]').forEach(el => spy.observe(el))
    return () => spy.disconnect()
  }, [cs, tocItems])

  useEffect(() => {
    if (!cs) return
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [cs])

  useEffect(() => {
    const onKeydown = (e) => {
      if (e.key !== 'Escape') return
      setLightboxImage(null)
      setTocOpen(false)
    }
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  }, [])

  if (state.status === 'loading') {
    return (
      <>
        <Nav dark={dark} setDark={setDark} />
        <div className="wrap cs-state">Loading case study…</div>
      </>
    )
  }
  if (state.status === 'missing' || state.status === 'notfound' || state.status === 'error') {
    return (
      <>
        <Nav dark={dark} setDark={setDark} />
        <div className="wrap cs-state">
          <p>{state.status === 'missing' ? 'No case study specified.' : "Couldn't load this case study."}</p>
          <p><a href="../#work">&larr; Back to case studies</a></p>
        </div>
      </>
    )
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav dark={dark} setDark={setDark} />
      <div className="layout">
        <Toc title={cs.title} items={tocItems} activeId={activeId} tocOpen={tocOpen} setTocOpen={setTocOpen} />
        <main className="content" id="main-content" tabIndex={-1}>
          <div id="top"></div>
          <div className="vlabel">{cs.client}</div>
          <h1>{cs.title}</h1>
          {cs.summary && <p className="summary">{cs.summary}</p>}
          <div className="cs-meta">
            {cs.role && <span>{cs.role}</span>}
            {cs.year && <span>{cs.year}</span>}
            {cs.tags?.map(t => <span key={t}>{t}</span>)}
          </div>
          {cs.coverImage && (
            <div className="cs-cover"><img src={cs.coverImage} alt={cs.title} onClick={() => setLightboxImage({ src: cs.coverImage, alt: cs.title })} /></div>
          )}
          {cs.metrics?.length > 0 && (
            <div className="cs-metrics">
              {cs.metrics.map((m, i) => (
                <div className="cs-metric" key={i}><b>{m.value}</b><span>{m.label}</span></div>
              ))}
            </div>
          )}
          {cs.body && documentToReactComponents(cs.body, richTextOptions)}
          {cs.gallery?.length > 0 && (
            <div className="cs-gallery">
              {cs.gallery.map(src => <img key={src} src={src} alt="" loading="lazy" onClick={() => setLightboxImage({ src, alt: '' })} />)}
            </div>
          )}
        </main>
      </div>

      <button className={`back-to-top ${showBackToTop ? 'visible' : ''}`} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </button>
      <button className="toc-toggle" type="button" aria-expanded={tocOpen} aria-controls="tocPanel" aria-label={tocOpen ? 'Close table of contents' : 'Open table of contents'} onClick={() => setTocOpen(o => !o)}>
        <svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h16" /></svg>
      </button>
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  )
}
