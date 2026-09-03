import { useEffect, useRef, useState } from 'react'

const HUE = '122, 106, 96'
const SIZE = 236
// Reference used a 3s step delay (~12s total intro). Far too long for a portfolio
// a recruiter is skimming, so the whole intro is budgeted from one knob.
const INTRO_MS = 7000
const LEAD_IN = 600
const HOLD = 1300 // beat held after the last line, before the curtain lifts
const STEP_GAP = (INTRO_MS - LEAD_IN - HOLD) / 3
const STEPS = [
  { icon: 'search', text: 'Looking for a product designer who thinks beyond the interface…' },
  { icon: 'spark', text: 'Found one: human-led, AI-assisted, relentlessly curious.' },
  { icon: 'folder', text: 'Loading portfolio…' },
  { icon: 'check', text: 'Ready when you are.' },
]

const ICONS = {
  search: <><circle cx="7.3" cy="7.3" r="5" /><path d="M10.9 10.9 15 15" /></>,
  spark: <path d="M8.5 2.2v12.6M2.2 8.5h12.6M4 4l9 9M13 4l-9 9" />,
  folder: <><path d="M1.8 5.2h5l1.4 1.9h7v7.4h-13.4z" /><path d="M1.8 5.2V3.4h4.4" /></>,
  check: <path d="M2.6 9.1 6.4 12.9 14.4 4.4" />,
}

const introLength = () => INTRO_MS

/** A wireframe cube whose vertices fly in from off-centre, then wire themselves together. */
function buildScene() {
  const budget = introLength()
  const spread = budget * 0.62
  const cx = SIZE / 2
  const cy = SIZE / 2
  const s = 52
  const a = Math.PI / 6

  const corners = []
  for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) corners.push([x, y, z])

  const yaw = -0.42
  const cy0 = Math.cos(yaw)
  const sy0 = Math.sin(yaw)
  const proj = (p) => {
    const x = p[0] * cy0 + p[2] * sy0
    const z = -p[0] * sy0 + p[2] * cy0
    return [cx + (x - z) * Math.cos(a) * s, cy + ((x + z) * Math.sin(a) - p[1] * 1.08) * s]
  }

  const edges = []
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      let d = 0
      for (let k = 0; k < 3; k++) if (corners[i][k] !== corners[j][k]) d++
      if (d === 1) edges.push([i, j])
    }
  }

  const dots = corners.map((c) => ({ t: proj(c), r: 2.4 }))
  const segs = []
  edges.forEach(([i, j]) => {
    const mid = [0, 1, 2].map((k) => (corners[i][k] + corners[j][k]) / 2)
    const m = dots.length
    dots.push({ t: proj(mid), r: 1.7 })
    segs.push([i, m], [m, j])
  })

  dots.forEach((d) => {
    const ang = Math.random() * Math.PI * 2
    const rad = 150 + Math.random() * 130
    d.from = [cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad * 0.85]
    d.delay = 150 + Math.random() * spread
    d.dur = budget * 0.14 + Math.random() * budget * 0.06
    d.arrive = d.delay + d.dur
    d.phase = Math.random() * Math.PI * 2
    d.speed = 0.00028 + Math.random() * 0.00022
    d.amp = 1.1 + Math.random() * 1.1
    d.x = d.t[0]
    d.y = d.t[1]
  })

  segs.forEach((sg) => { sg[2] = Math.max(dots[sg[0]].arrive, dots[sg[1]].arrive) + 140 })
  return { dots, segs }
}

function LogoCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    cv.width = SIZE * dpr
    cv.height = SIZE * dpr
    const ctx = cv.getContext('2d')
    ctx.scale(dpr, dpr)

    const { dots, segs } = buildScene()
    const start = performance.now()
    const ease = (p) => 1 - Math.pow(1 - p, 3)
    let raf = 0

    const draw = (now) => {
      const t = now - start
      ctx.clearRect(0, 0, SIZE, SIZE)

      dots.forEach((d) => {
        const p = Math.max(0, Math.min(1, (t - d.delay) / d.dur))
        const e = ease(p)
        const drift = Math.max(0, Math.min(1, (t - d.arrive) / 1400))
        const dx = Math.sin(t * d.speed + d.phase) * d.amp * drift
        const dy = Math.cos(t * d.speed * 0.82 + d.phase * 1.7) * d.amp * drift
        d.x = d.from[0] + (d.t[0] - d.from[0]) * e + dx
        d.y = d.from[1] + (d.t[1] - d.from[1]) * e + dy
        d.s = p <= 0 ? 0 : Math.min(1, e * 1.15)
      })

      ctx.lineWidth = 1
      segs.forEach(([i, j, st]) => {
        const al = Math.max(0, Math.min(1, (t - st) / 750))
        if (al <= 0) return
        ctx.strokeStyle = `rgba(${HUE},${(al * 0.3).toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(dots[i].x, dots[i].y)
        ctx.lineTo(dots[j].x, dots[j].y)
        ctx.stroke()
      })

      dots.forEach((d) => {
        if (d.s <= 0) return
        ctx.fillStyle = `rgba(${HUE},${(0.86 * d.s).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r * d.s, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={ref} className="intro-logo" aria-hidden="true" />
}

/**
 * Full-screen intro. Plays once per browser session, and is skipped entirely
 * under prefers-reduced-motion, so it never becomes a barrier to the content.
 */
export default function IntroLoader({ onDone }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timers = []
    for (let i = 1; i <= 4; i++) {
      timers.push(setTimeout(() => setStep(i), LEAD_IN + STEP_GAP * (i - 1)))
    }
    timers.push(setTimeout(() => {
      setDone(true)
      onDone?.()
    }, introLength()))
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  return (
    <div className={`intro ${done ? 'intro-done' : ''}`} role="status" aria-live="polite">
      <div className="intro-inner">
        <LogoCanvas />
        <div className="intro-steps">
          {STEPS.map((s, i) => {
            const shown = step >= i + 1
            const active = step === i + 1
            return (
              <div key={s.icon} className={`intro-step ${shown ? 'shown' : ''} ${active ? 'active' : ''}`.trim()}>
                <div className="intro-step-rail">
                  <div className="intro-step-icon">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.2">
                      {ICONS[s.icon]}
                    </svg>
                  </div>
                  {i < STEPS.length - 1 && <div className="intro-step-line" />}
                </div>
                <div className="intro-step-text">{s.text}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
