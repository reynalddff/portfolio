import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchList } from '../contentfulClient'
import HeroCanvas from '../components/HeroCanvas'
import IntroLoader from '../components/IntroLoader'
import '../styles/Home.css'

// Real testimonials, carried over from the pre-React homepage (homepage.js).
// All three are FLIK colleagues; the source data has no company field of its own.
const TESTIMONIALS = [
  {
    name: 'Kandika Bagaskara',
    role: 'Senior Product Manager',
    company: 'FLIK',
    quote: 'I had the pleasure of working with Daffa at FLIK, where he was part of my team as a Product Designer. He consistently delivered high-quality work at speed, with great attention to detail. His openness to grow into an Associate Product Manager role showed real adaptability and drive.',
  },
  {
    name: 'Reza Dwi Cahyo',
    role: 'Product Manager',
    company: 'FLIK',
    quote: 'I worked with Daffa on the Merchant Dashboard project at FLIK, where he was Product Designer. He brought strong attention to detail and solid design thinking, and was always easy to collaborate with.',
  },
  {
    name: 'Raam Pujangga Sadewa',
    role: 'Product Designer',
    company: 'FLIK',
    quote: 'I worked with Daffa as a peer Product Designer at FLIK, collaborating closely on research and building our design system. He was thoughtful, detail-oriented, and great to build with.',
  },
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, visible]
}

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, visible] = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${visible ? 'in' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}

/**
 * The nav sits over warm-paper sections and dark sections alike, so it flips
 * its palette when a dark section crosses the nav band.
 */
function useNavOverDark() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const targets = ['about', 'contact'].map(id => document.getElementById(id)).filter(Boolean)
    if (targets.length === 0) return
    const hits = new Set()
    // Shrink the observer root to a thin band just below the 72px nav.
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) hits.add(entry.target.id)
        else hits.delete(entry.target.id)
      })
      setDark(hits.size > 0)
    }, { rootMargin: `-82px 0px -${Math.max(0, window.innerHeight - 84)}px 0px`, threshold: 0 })
    targets.forEach(t => io.observe(t))
    return () => io.disconnect()
  }, [])
  return dark
}

function Nav() {
  const dark = useNavOverDark()
  const onJump = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }
  return (
    <nav className={`home-nav ${dark ? 'over-dark' : ''}`.trim()}>
      <div className="home-nav-wrap">
        <a className="home-nav-mark" href="#hero" onClick={e => onJump(e, 'hero')}>RDP.</a>
        <div className="home-nav-links">
          <a href="#hero" onClick={e => onJump(e, 'hero')}>Home</a>
          <a href="#projects" onClick={e => onJump(e, 'projects')}>Project</a>
          <a href="#about" onClick={e => onJump(e, 'about')}>About Me</a>
        </div>
        <a className="home-nav-cta" href="#contact" onClick={e => onJump(e, 'contact')}>GET IN TOUCH</a>
      </div>
    </nav>
  )
}

function ProjectCard({ project, index }) {
  return (
    <Link to={`/case-study/${project.slug}`} className="proj-card">
      <div className="proj-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="2.5" y="4.5" width="13" height="9" rx="1.5" />
          <path d="M2.5 7.6h13M5.6 11h3" />
        </svg>
      </div>
      <div className="proj-title">{project.title}</div>
      <div className="proj-summary">{project.summary}</div>
      <div className="proj-visual" aria-hidden="true">
        {project.coverImage
          ? <img src={project.coverImage} alt="" loading="lazy" />
          : `CASE VISUAL ${String(index + 1).padStart(2, '0')}`}
      </div>
      <div className="proj-readmore">READ MORE ↗</div>
    </Link>
  )
}

/** Side projects use a two-column split (copy left, visual right), not the stacked case-study card. */
function SideProjectCard({ project, index }) {
  return (
    <Link to={`/side-project/${project.slug}`} className="side-card">
      <div className="side-card-body">
        <div className="side-card-title">{project.title}</div>
        <div className="side-card-summary">{project.summary}</div>
        <div className="proj-readmore">READ MORE ↗</div>
      </div>
      <div className="side-card-visual" aria-hidden="true">
        {project.coverImage
          ? <img src={project.coverImage} alt="" loading="lazy" />
          : `PROJECT VISUAL ${String(index + 1).padStart(2, '0')}`}
      </div>
    </Link>
  )
}

/** Slow vertical light-bars behind the contact block. */
function FooterSpokes() {
  return (
    <div className="footer-spokes" aria-hidden="true">
      {Array.from({ length: 22 }, (_, i) => (
        <span
          key={i}
          style={{
            animationDuration: `${[5.4, 6.1, 6.8][i % 3]}s`,
            animationDelay: `${(i * 0.19).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const [caseStudies, setCaseStudies] = useState(null)
  const [sideProjects, setSideProjects] = useState(null)
  // Intro plays once per browser session, and never under reduced motion.
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === 'undefined') return true
    if (prefersReducedMotion()) return true
    return sessionStorage.getItem('introPlayed') === '1'
  })
  const showIntro = !introDone

  const handleIntroDone = useCallback(() => {
    sessionStorage.setItem('introPlayed', '1')
    setIntroDone(true)
  }, [])

  useEffect(() => {
    fetchList('caseStudy').then(setCaseStudies).catch(() => setCaseStudies([]))
    fetchList('sideProject').then(setSideProjects).catch(() => setSideProjects([]))
  }, [])

  useEffect(() => {
    document.title = 'Reynald Daffa Pahlevi — B2B Product Designer'
  }, [])

  // Lock scrolling behind the intro so the page can't be scrolled while hidden.
  useEffect(() => {
    if (!showIntro) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [showIntro])

  return (
    <>
      {showIntro && <IntroLoader onDone={handleIntroDone} />}

      <div className={`site ${introDone ? 'site-in' : ''}`.trim()}>
        <Nav />

        <section id="hero" className="hero">
          <HeroCanvas />
          <div className="hero-inner">
            <div className="eyebrow">PRODUCT DESIGNER · 5+ YEARS · B2B · AI-ASSISTED</div>
            <h1>I design B2B products that turn better experiences into better outcomes.</h1>
            <p className="hero-sub">From research and product strategy to design and prototyping, I use AI to explore faster, solve better, and build products that create measurable impact.</p>
          </div>
        </section>

        <section id="projects" className="projects">
          <Reveal className="projects-grid">
            <div className="projects-heading">
              <div className="eyebrow">SELECTED PROJECTS</div>
              <div className="serif-heading">The work behind the screens.</div>
            </div>
            {caseStudies === null && <div className="proj-card proj-loading">Loading case studies…</div>}
            {caseStudies?.length === 0 && <div className="proj-card proj-loading">Case studies unavailable right now.</div>}
            {caseStudies?.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </Reveal>
        </section>

        <section id="testimonials" className="testimonials">
          <Reveal className="testimonials-grid">
            <div className="testimonials-heading">
              <div className="eyebrow">TESTIMONIALS</div>
              <div className="serif-heading">Worked with,<br />not for.</div>
            </div>
            <div className="testimonial-list">
              {TESTIMONIALS.map((t) => (
                <figure key={t.name} className="testimonial">
                  <blockquote className="testimonial-quote">{t.quote}</blockquote>
                  <figcaption className="testimonial-who">{t.name} — {t.role}, {t.company}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </section>

        {sideProjects?.length > 0 && (
          <section className="side-projects">
            <Reveal className="side-projects-inner">
              <div className="serif-heading">Side Projects</div>
              {sideProjects.map((p, i) => (
                <SideProjectCard key={p.slug} project={p} index={i} />
              ))}
            </Reveal>
          </section>
        )}

        <section id="about" className="about">
          <Reveal className="about-inner">
            <div className="about-top">
              <div className="portrait"><img src="/img/Photo.png" alt="Reynald Daffa Pahlevi" loading="lazy" /></div>
              <div>
                <div className="eyebrow dark">About me</div>
                <p className="about-body">I am a Product Designer with a Master&rsquo;s in Information Technology and over 5 years of experience. I specialize in untangling the &ldquo;hard parts&rdquo; of B2B SaaS, Fintech and E-Commerce, transforming complex enterprise workflows into intuitive, high-adoption products. From scaling subscription conversions by 200% at SIRCLO to driving Rp6B GMV through offline activation flows at FLIK, I build for measurable impact rather than just aesthetics. My technical background allows me to bridge the gap between design and engineering, ensuring scalable systems survive the handoff and move the numbers that matter: activation, adoption, and retention.</p>
              </div>
            </div>

            <div className="about-grid">
              <div>
                <div className="eyebrow dark">Experience</div>
                <div className="timeline">
                  <div className="timeline-row"><div className="timeline-when">2026</div><div className="timeline-what">Product Designer · eDOT</div></div>
                  <div className="timeline-row"><div className="timeline-when">2025 – 2026</div><div className="timeline-what">Associate Product Manager · FLIK</div></div>
                  <div className="timeline-row"><div className="timeline-when">2023 – 2026</div><div className="timeline-what">Product Designer · FLIK</div></div>
                  <div className="timeline-row"><div className="timeline-when">2022</div><div className="timeline-what">Associate UI/UX Designer · SIRCLO</div></div>
                </div>
              </div>
              <div>
                <div className="eyebrow dark">Education</div>
                <div className="timeline">
                  <div className="timeline-row">
                    <div className="timeline-when">2024 – 2026</div>
                    <div><div className="timeline-what">Master of Information Technology</div><div className="timeline-sub">University of Indonesia</div></div>
                  </div>
                  <div className="timeline-row">
                    <div className="timeline-when">2016 – 2020</div>
                    <div><div className="timeline-what">Bachelor of Computer Science</div><div className="timeline-sub">University of Brawijaya</div></div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="contact" className="contact">
          <FooterSpokes />
          <Reveal className="contact-inner">
            <div className="contact-grid">
              <a className="contact-hello" href="mailto:reynalddaffa.dev@gmail.com">
                <div className="eyebrow dark">Say hello</div>
                <div className="serif-heading">reynalddaffa.dev@gmail.com</div>
                <div className="contact-note">Open to product design roles, Jakarta / remote</div>
              </a>
              <div className="contact-elsewhere">
                <div className="eyebrow dark">Elsewhere</div>
                <div className="timeline">
                  <a className="timeline-row link-row" href="https://drive.google.com/file/d/1MIBLR-9YFL-308-YHAT5PF2SWsGX9Zvk/view?usp=sharing" target="_blank" rel="noopener noreferrer">Résumé (PDF) ↗</a>
                  <a className="timeline-row link-row" href="https://www.linkedin.com/in/reynalddaffa/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                  <a className="timeline-row link-row" href="https://github.com/reynalddff" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                  <a className="timeline-row link-row" href="https://www.instagram.com/reynalddaffa/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
                  <a className="timeline-row link-row" href="https://www.tiktok.com/@reynald.daffa" target="_blank" rel="noopener noreferrer">TikTok ↗</a>
                </div>
              </div>
            </div>
            <div className="contact-copyright">© {new Date().getFullYear()} REYNALD DAFFA PAHLEVI</div>
          </Reveal>
        </section>
      </div>
    </>
  )
}
