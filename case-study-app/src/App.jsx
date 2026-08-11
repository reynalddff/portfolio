import { useEffect, useState } from 'react'
import { PortableText } from '@portabletext/react'
import { fetchCaseStudy } from './sanityClient'
import './App.css'

function useTheme() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])
  return [dark, setDark]
}

function Nav({ dark, setDark }) {
  return (
    <nav>
      <div className="wrap">
        <a className="mark" href="../homepage.html#top">REYNALD<span>.</span></a>
        <div className="links">
          <a href="../homepage.html#top">Home</a>
          <a href="../homepage.html#work">Case Study</a>
          <a href="../homepage.html#profile">Profile</a>
        </div>
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
    </nav>
  )
}

export default function App() {
  const [dark, setDark] = useTheme()
  const [state, setState] = useState({ status: 'loading', data: null })

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
          <p><a href="../homepage.html#work">&larr; Back to case studies</a></p>
        </div>
      </>
    )
  }

  const cs = state.data
  return (
    <>
      <Nav dark={dark} setDark={setDark} />
      <div className="wrap cs-wrap">
        <div className="vlabel">{cs.client}</div>
        <h1 className="title">{cs.title}</h1>
        <div className="cs-meta">
          {cs.role && <span>{cs.role}</span>}
          {cs.year && <span>{cs.year}</span>}
          {cs.tags?.map(t => <span key={t}>{t}</span>)}
        </div>
        {cs.summary && <p className="cs-body" style={{ marginTop: 24 }}>{cs.summary}</p>}
        {cs.coverImage && (
          <div className="cs-cover"><img src={cs.coverImage} alt={cs.title} /></div>
        )}
        {cs.metrics?.length > 0 && (
          <div className="cs-metrics">
            {cs.metrics.map((m, i) => (
              <div className="cs-metric" key={i}><b>{m.value}</b><span>{m.label}</span></div>
            ))}
          </div>
        )}
        {cs.body && (
          <div className="cs-body">
            <PortableText value={cs.body} />
          </div>
        )}
        {cs.gallery?.length > 0 && (
          <div className="cs-gallery">
            {cs.gallery.map(src => <img key={src} src={src} alt="" loading="lazy" />)}
          </div>
        )}
      </div>
    </>
  )
}
