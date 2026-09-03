import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { fetchEntry, fetchList } from '../contentfulClient'
import '../styles/ProjectDetail.css'

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
    // Contentful's Heading 1 is a section heading, rendered as the page's <h2>
    // (the one true <h1> is the title). Only those list in the TOC; Heading 2
    // sub-sections stay out of it, matching the flat rail in the design.
    if (node.nodeType !== BLOCKS.HEADING_1) continue
    const text = textOf(node)
    let id = slugify(text) || 'section'
    const count = seen.get(id) || 0
    seen.set(id, count + 1)
    if (count > 0) id = `${id}-${count}`
    slugs.set(node, id)
    items.push({ id, text })
  }
  return { slugs, items }
}

function Toc({ items, activeId }) {
  if (items.length === 0) return null
  return (
    <aside className="pd-toc">
      <nav aria-label="Table of contents">
        {items.map(item => (
          <a key={item.id} className={activeId === item.id ? 'active' : ''} href={`#${item.id}`}>
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
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

export default function ProjectDetail({ contentType }) {
  const { slug } = useParams()
  const [state, setState] = useState({ status: 'loading', data: null })
  const [siblings, setSiblings] = useState(null)
  const [activeId, setActiveId] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [lightboxImage, setLightboxImage] = useState(null)

  const isSideProject = contentType === 'sideProject'
  const backHref = isSideProject ? '/#projects' : '/#projects'
  const kindLabel = isSideProject ? 'Side Project' : 'Case Study'
  const kindPath = isSideProject ? 'side-project' : 'case-study'

  useEffect(() => {
    setState({ status: 'loading', data: null })
    fetchEntry(contentType, slug)
      .then(data => setState(data ? { status: 'ready', data } : { status: 'notfound', data: null }))
      .catch(() => setState({ status: 'error', data: null }))
    fetchList(contentType).then(setSiblings).catch(() => setSiblings([]))
  }, [contentType, slug])

  const cs = state.status === 'ready' ? state.data : null
  const { slugs: headingSlugs, items: tocItems } = useMemo(() => buildToc(cs?.body), [cs])

  const next = useMemo(() => {
    if (!siblings?.length || !cs) return null
    const i = siblings.findIndex(s => s.slug === cs.slug)
    if (i === -1) return null
    return siblings[(i + 1) % siblings.length]
  }, [siblings, cs])

  useEffect(() => {
    if (cs) document.title = `${kindLabel} — ${cs.title}`
  }, [cs, kindLabel])

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
    document.querySelectorAll('#pd-content [id]').forEach(el => spy.observe(el))
    return () => spy.disconnect()
  }, [cs, tocItems])

  useEffect(() => {
    if (!cs) return
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [cs])

  useEffect(() => {
    const onKeydown = (e) => {
      if (e.key === 'Escape') setLightboxImage(null)
    }
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  }, [])

  const header = (
    <div className="pd-header">
      <Link to={backHref}>← All work</Link>
      <Link to="/" className="pd-mark">RDP.</Link>
    </div>
  )

  if (state.status === 'loading') {
    return (
      <>
        {header}
        <div className="pd-state">Loading {kindLabel.toLowerCase()}…</div>
      </>
    )
  }
  if (state.status === 'notfound' || state.status === 'error') {
    return (
      <>
        {header}
        <div className="pd-state">
          <p>Couldn&rsquo;t load this {kindLabel.toLowerCase()}.</p>
          <p><Link to={backHref}>← Back to all work</Link></p>
        </div>
      </>
    )
  }

  return (
    <>
      {header}
      <div className="pd-layout">
        <main className="pd-content" id="pd-content" tabIndex={-1}>
          <div id="top"></div>
          {cs.coverImage ? (
            <div className="pd-cover"><img src={cs.coverImage} alt={cs.title} onClick={() => setLightboxImage({ src: cs.coverImage, alt: cs.title })} /></div>
          ) : (
            <div className="pd-cover pd-cover-placeholder">COVER IMAGE</div>
          )}
          <h1>{cs.title}</h1>
          <div className="pd-meta">{[cs.client, cs.role, cs.year].filter(Boolean).join(' · ') || kindLabel}</div>
          {cs.summary && <p className="pd-summary">{cs.summary}</p>}
          {cs.link && (
            <a className="pd-link" href={cs.link} target="_blank" rel="noopener noreferrer">View Detail Project →</a>
          )}
          {cs.metrics?.length > 0 && (
            <div className="pd-metrics">
              {cs.metrics.map((m, i) => (
                <div className="pd-metric" key={i}><b>{m.value}</b><span>{m.label}</span></div>
              ))}
            </div>
          )}
          {cs.body && documentToReactComponents(cs.body, richTextOptions)}
          {cs.gallery?.length > 0 && (
            <div className="pd-gallery">
              {cs.gallery.map(src => <img key={src} src={src} alt="" loading="lazy" onClick={() => setLightboxImage({ src, alt: '' })} />)}
            </div>
          )}
          {next && (
            <Link className="pd-next" to={`/${kindPath}/${next.slug}`}>NEXT {kindLabel.toUpperCase()} — {next.title} ↗</Link>
          )}
        </main>
        <Toc items={tocItems} activeId={activeId} />
      </div>

      <button className={`pd-back-to-top ${showBackToTop ? 'visible' : ''}`} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </button>
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  )
}
