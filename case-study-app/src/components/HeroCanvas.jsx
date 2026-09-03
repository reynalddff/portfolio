import { useEffect, useRef } from 'react'

const HUE = '122, 106, 96'
const CELL = 64

/**
 * Hero background: a faint grid of dots that inks in under the cursor and
 * blooms at random cells on its own. Ported from the redesign reference.
 * Canvas-only, no React state per frame.
 */
export default function HeroCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ctx, w, h, cols, rows, ink
    let raf = 0
    let nextBloom = 0
    const pointer = { x: -999, y: -999, on: 0, t: 0 }

    const size = () => {
      const r = cv.getBoundingClientRect()
      if (!r.width || !r.height) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.round(r.width)
      h = Math.round(r.height)
      cv.width = w * dpr
      cv.height = h * dpr
      ctx = cv.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / CELL) + 1
      rows = Math.ceil(h / CELL) + 1
      ink = new Float32Array(cols * rows)
    }

    size()
    if (!ctx) return

    const t0 = performance.now()
    const draw = (now) => {
      raf = requestAnimationFrame(draw)
      if (!ctx || !w) return
      const t = now - t0
      pointer.t += (pointer.on - pointer.t) * 0.05
      ctx.clearRect(0, 0, w, h)

      if (t > nextBloom) {
        nextBloom = t + 1100 + Math.random() * 1800
        ink[Math.floor(Math.random() * ink.length)] = 0.5 + Math.random() * 0.3
      }

      if (pointer.t > 0.02) {
        const ci = Math.floor(pointer.x / CELL)
        const ri = Math.floor(pointer.y / CELL)
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const c = ci + dc
            const r = ri + dr
            if (c < 0 || r < 0 || c >= cols || r >= rows) continue
            const idx = r * cols + c
            ink[idx] = Math.min(1, ink[idx] + (dr === 0 && dc === 0 ? 0.075 : 0.022) * pointer.t)
          }
        }
      }

      for (let i = 0; i < ink.length; i++) {
        if (ink[i] <= 0) continue
        ink[i] *= 0.992
        if (ink[i] < 0.004) { ink[i] = 0; continue }
        const c = i % cols
        const r = (i - c) / cols
        ctx.fillStyle = `rgba(${HUE},${(ink[i] * 0.115).toFixed(4)})`
        ctx.fillRect(c * CELL, r * CELL, CELL, CELL)
      }

      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(${HUE},0.06)`
      ctx.beginPath()
      for (let x = 0; x <= w; x += CELL) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h) }
      for (let y = 0; y <= h; y += CELL) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5) }
      ctx.stroke()

      ctx.fillStyle = `rgba(${HUE},0.24)`
      for (let x = 0; x <= w; x += CELL) {
        for (let y = 0; y <= h; y += CELL) {
          const d = pointer.t > 0.02 ? Math.hypot(x - pointer.x, y - pointer.y) : 9999
          const near = d < 180 ? (1 - d / 180) * pointer.t : 0
          ctx.beginPath()
          ctx.arc(x, y, 0.85 + near * 1.6, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
    raf = requestAnimationFrame(draw)

    const onResize = () => size()
    const onMove = (e) => {
      const r = cv.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.on = 1
    }
    const onLeave = () => { pointer.on = 0 }

    window.addEventListener('resize', onResize)
    const parent = cv.parentElement
    parent.addEventListener('pointermove', onMove)
    parent.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />
}
