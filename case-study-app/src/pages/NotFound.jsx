import { useEffect } from 'react'
import '../styles/NotFound.css'

// Homepage sections rather than routes — Home.jsx scrolls to the hash on arrival.
const PAGES = [
  { label: 'Home', href: '/' },
  { label: 'Project', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
]

export default function NotFound() {
  useEffect(() => {
    document.title = '404 — Reynald Daffa Pahlevi'
  }, [])

  return (
    <main className="nf">
      <div className="nf-main">
        <div className="eyebrow">404</div>
        <h1 className="nf-title">There is no page here.</h1>
        <p className="nf-sub">Try one of the three on the right.</p>
        <div className="nf-sign">
          <span className="nf-sign-rule" aria-hidden="true" />
          <span className="nf-sign-name">Daffa</span>
        </div>
      </div>

      <nav className="nf-rail" aria-label="Pages">
        <div className="eyebrow nf-rail-label">Pages</div>
        {PAGES.map(p => (
          <a key={p.label} className="nf-rail-link" href={p.href}>{p.label}</a>
        ))}
      </nav>
    </main>
  )
}
