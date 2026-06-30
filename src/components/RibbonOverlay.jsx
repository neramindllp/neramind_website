import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react'

// ── Smooth value noise ────────────────────────────────────────────────────────
const P = new Uint8Array(512)
;(function () {
  const b = Array.from({ length: 256 }, (_, i) => i)
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]]
  }
  for (let i = 0; i < 512; i++) P[i] = b[i & 255]
})()

function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10) }
function lerpF(a, b, t) { return a + (b - a) * t }
function vnoise(x) {
  const X = Math.floor(x) & 255
  const f = x - Math.floor(x)
  return lerpF((P[X] / 127.5) - 1, (P[X + 1] / 127.5) - 1, fade(f))
}

// ── Catmull-Rom → cubic Bézier path string ───────────────────────────────────
function buildPath(pts) {
  if (pts.length < 2) return ''
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const cx1 = p1[0] + (p2[0] - p0[0]) / 6
    const cy1 = p1[1] + (p2[1] - p0[1]) / 6
    const cx2 = p2[0] - (p3[0] - p1[0]) / 6
    const cy2 = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${cx1.toFixed(1)},${cy1.toFixed(1)} ${cx2.toFixed(1)},${cy2.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d
}

// ── Seeded random helpers (stable per-card) ───────────────────────────────────
function seededRand(seed) {
  let s = seed
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

// Generate N completely independent strands with random anchor layouts
function generateStrands(W, H, count, seed) {
  const rand = seededRand(seed)
  return Array.from({ length: count }, (_, i) => {
    // Each strand gets 4-6 anchors, fully random positions across the card
    const anchorCount = 4 + Math.floor(rand() * 3)   // 4–6
    const anchors = Array.from({ length: anchorCount }, (_, ai) => {
      // Distribute anchors so they progress roughly top-to-bottom
      // but with wide horizontal freedom
      const ty = ai / (anchorCount - 1)
      return [
        (rand() * 1.3 - 0.15) * W,               // -15% to 115% width (exits edges)
        (ty * 1.2 - 0.1) * H + (rand() - 0.5) * H * 0.25, // spread vertically
      ]
    })
    return {
      anchors,
      // Each strand has its own independent noise phase and speed
      phaseX: rand() * 100,
      phaseY: rand() * 100,
      speedX: 0.18 + rand() * 0.22,   // 0.18 – 0.40
      speedY: 0.15 + rand() * 0.20,
      ampX:   W * (0.06 + rand() * 0.09),  // 6%–15% of card width
      ampY:   H * (0.05 + rand() * 0.08),
      // Each strand's spring state
      springs: Array.from({ length: anchorCount }, () => ({ x: 0, y: 0, vx: 0, vy: 0 })),
    }
  })
}

const STRAND_COUNT = 12   // total independent strands per card

// ── Spring — critically damped, no bounce ────────────────────────────────────
function tickSpring(s, tx, ty, dt) {
  const k = 80, damp = 15
  s.vx += (-k * (s.x - tx) - damp * s.vx) * dt
  s.vy += (-k * (s.y - ty) - damp * s.vy) * dt
  s.x  += s.vx * dt
  s.y  += s.vy * dt
}

// ── Proximity of mouse to a path (point-on-polyline distance) ────────────────
function distToPath(pts, mx, my) {
  let minD = Infinity
  for (let i = 0; i < pts.length - 1; i++) {
    const ax = pts[i][0], ay = pts[i][1]
    const bx = pts[i+1][0], by = pts[i+1][1]
    const dx = bx - ax, dy = by - ay
    const lenSq = dx*dx + dy*dy
    const t = lenSq > 0 ? Math.max(0, Math.min(1, ((mx-ax)*dx + (my-ay)*dy) / lenSq)) : 0
    const px = ax + t*dx - mx, py = ay + t*dy - my
    minD = Math.min(minD, Math.sqrt(px*px + py*py))
  }
  return minD
}

// ── Component ─────────────────────────────────────────────────────────────────
const RibbonOverlay = forwardRef(function RibbonOverlay(
  { visible, color = '#C2410C', opacity = 0 },
  ref
) {
  const svgRef    = useRef(null)
  const rafRef    = useRef(null)
  const stateRef  = useRef(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })

  useImperativeHandle(ref, () => ({
    dispatchMouseMove(e) {
      const svg = svgRef.current
      if (!svg) return
      const r = svg.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    },
  }), [])

  const init = useCallback(() => {
    const svg = svgRef.current
    if (!svg) return
    const W = svg.clientWidth  || 400
    const H = svg.clientHeight || 280
    // Use a stable seed based on the element's position so each card is different
    const seed = Math.round(svg.getBoundingClientRect().left + svg.getBoundingClientRect().top) || 42
    stateRef.current = { t: 0, W, H, strands: generateStrands(W, H, STRAND_COUNT, seed) }
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    init()
    const ro = new ResizeObserver(init)
    ro.observe(svg)
    return () => ro.disconnect()
  }, [init])

  useEffect(() => {
    if (!visible) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }
    if (!stateRef.current) init()

    let prev = performance.now()

    function frame(now) {
      rafRef.current = requestAnimationFrame(frame)
      const dt  = Math.min((now - prev) / 1000, 0.05)
      prev = now
      const st  = stateRef.current
      const svg = svgRef.current
      if (!st || !svg) return

      st.t += dt
      const { t, W, H, strands } = st
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Mouse influence radius — roughly 30% of the smaller dimension
      const RADIUS = Math.min(W, H) * 0.35
      const FORCE  = Math.min(W, H) * 0.14

      const pathEls = svg.querySelectorAll('path')

      strands.forEach((strand, si) => {
        // 1. Compute noise-animated anchor positions
        const animated = strand.anchors.map(([bx, by], ai) => {
          const offX = vnoise(strand.phaseX + ai * 1.3 + t * strand.speedX) * strand.ampX
          const offY = vnoise(strand.phaseY + ai * 0.9 + t * strand.speedY) * strand.ampY
          return [bx + offX, by + offY]
        })

        // 2. Apply spring-based mouse repulsion to each anchor
        animated.forEach(([px, py], ai) => {
          const dx = px - mx, dy = py - my
          const dist = Math.sqrt(dx*dx + dy*dy)
          let tx = 0, ty = 0
          if (dist < RADIUS && dist > 1) {
            const g  = Math.exp(-(dist*dist) / (2 * (RADIUS*0.45)**2))
            const f  = FORCE * g
            tx = (dx / dist) * f
            ty = (dy / dist) * f
          }
          tickSpring(strand.springs[ai], tx, ty, dt)
        })

        const finalPts = animated.map(([px, py], ai) => [
          px + strand.springs[ai].x,
          py + strand.springs[ai].y,
        ])

        // 3. Glow: measure how close mouse is to this strand's path
        const d = distToPath(finalPts, mx, my)
        const GLOW_R  = 60                              // px — glow radius
        const glowT   = Math.max(0, 1 - d / GLOW_R)   // 0 far, 1 touching
        const baseOp  = 0.10
        const glowOp  = baseOp + glowT * 0.45          // 0.10 → 0.55
        const sw      = 0.6 + glowT * 1.6              // strokeWidth 0.6 → 2.2

        const el = pathEls[si]
        if (!el) return
        el.setAttribute('d', buildPath(finalPts))
        el.setAttribute('stroke-opacity', glowOp.toFixed(3))
        el.setAttribute('stroke-width', sw.toFixed(2))
        // Glow colour: shift from base colour toward bright accent on proximity
        el.setAttribute('filter', glowT > 0.05 ? `url(#rglow)` : 'none')
      })
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [visible, init])

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity,
        transition: 'opacity 0.5s ease',
        borderRadius: 'inherit',
        overflow: 'hidden',
      }}
    >
      <defs>
        {/* Soft glow filter applied to strands near cursor */}
        <filter id="rglow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {Array.from({ length: STRAND_COUNT }, (_, i) => (
        <path
          key={i}
          fill="none"
          stroke={color}
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.10"
        />
      ))}
    </svg>
  )
})

export default RibbonOverlay
