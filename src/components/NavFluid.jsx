import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'

// ── Value noise ────────────────────────────────────────────────────────────────
const _P = new Uint8Array(512)
;(function () {
  const b = Array.from({ length: 256 }, (_, i) => i)
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]]
  }
  for (let i = 0; i < 512; i++) _P[i] = b[i & 255]
})()

function _fade(t) { return t * t * t * (t * (t * 6 - 15) + 10) }
function _lf(a, b, t) { return a + (b - a) * t }
function vnoise(x) {
  const X = Math.floor(x) & 255
  const f = x - Math.floor(x)
  return _lf((_P[X] / 127.5) - 1, (_P[X + 1] / 127.5) - 1, _fade(f))
}

// ── Catmull-Rom → SVG cubic bezier ────────────────────────────────────────────
function buildPath(pts) {
  if (pts.length < 2) return ''
  let d = `M${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const cx1 = p1[0] + (p2[0] - p0[0]) / 6
    const cy1 = p1[1] + (p2[1] - p0[1]) / 6
    const cx2 = p2[0] - (p3[0] - p1[0]) / 6
    const cy2 = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${cx1.toFixed(2)},${cy1.toFixed(2)} ${cx2.toFixed(2)},${cy2.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`
  }
  return d
}

// ── Seeded random ─────────────────────────────────────────────────────────────
function makeRand(seed) {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0
    return s / 0xffffffff
  }
}

// ── Generate strands ──────────────────────────────────────────────────────────
// Each strand is a set of free-floating anchor points in [0..W] x [0..H].
// Anchors are completely random — no forced direction, no grouping.
function createStrands(W, H, count) {
  return Array.from({ length: count }, (_, si) => {
    const rand = makeRand(si * 7919 + 1234)
    const anchorCount = 4 + Math.floor(rand() * 4)  // 4–7 anchors
    const anchors = Array.from({ length: anchorCount }, () => [
      rand() * W,
      rand() * H,
    ])
    return {
      anchors,
      // Each strand has its own independent slow-drift noise params
      noisePhaseX: rand() * 200,
      noisePhaseY: rand() * 200,
      noiseSpeedX: 0.06 + rand() * 0.10,   // very slow ambient
      noiseSpeedY: 0.05 + rand() * 0.08,
      noiseAmpX:   W * (0.04 + rand() * 0.06),
      noiseAmpY:   H * (0.04 + rand() * 0.06),
      // Burst state — applied additively on hover-change
      burstAnchors: Array.from({ length: anchorCount }, () => [0, 0]),
      burstVel:     Array.from({ length: anchorCount }, () => [0, 0]),
      strokeW: 0.8 + rand() * 1.2,
      opacity: 0.18 + rand() * 0.22,
    }
  })
}

const STRAND_COUNT = 14

// ── Spring tick (critically damped) ──────────────────────────────────────────
function springTick(pos, vel, target, dt, k = 60, damp = 14) {
  vel[0] += (-k * (pos[0] - target[0]) - damp * vel[0]) * dt
  vel[1] += (-k * (pos[1] - target[1]) - damp * vel[1]) * dt
  pos[0] += vel[0] * dt
  pos[1] += vel[1] * dt
}

// ── Component ─────────────────────────────────────────────────────────────────
const NavFluid = forwardRef(function NavFluid(_, ref) {
  const svgRef    = useRef(null)
  const stateRef  = useRef(null)
  const rafRef    = useRef(null)
  // burstPhase: 0 = idle, >0 = settling (decays toward 0 each frame)
  const burstRef  = useRef(0)

  useImperativeHandle(ref, () => ({
    setHover() {
      // Trigger a burst: jolt every anchor in a random direction
      const st = stateRef.current
      if (!st) return
      const { W, H, strands } = st
      const rand = makeRand(Date.now() & 0xffff)

      strands.forEach(strand => {
        strand.burstAnchors.forEach((ba, ai) => {
          // Random abrupt displacement — large and directional per-strand
          const angle = rand() * Math.PI * 2
          const mag   = W * (0.12 + rand() * 0.18)
          // Set velocity to shoot in that direction
          strand.burstVel[ai][0] = Math.cos(angle) * mag * 4
          strand.burstVel[ai][1] = Math.sin(angle) * mag * 4
          // Current burst displacement stays, velocity will carry it
        })
      })

      burstRef.current = 1.0  // full burst, decays to 0
    },
  }))

  // Init SVG state
  const init = () => {
    const svg = svgRef.current
    if (!svg) return
    const W = svg.clientWidth  || 500
    const H = svg.clientHeight || 800
    stateRef.current = { t: 0, W, H, strands: createStrands(W, H, STRAND_COUNT) }
  }

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    init()

    const ro = new ResizeObserver(init)
    ro.observe(svg)

    let prev = performance.now()

    function frame(now) {
      rafRef.current = requestAnimationFrame(frame)
      const dt  = Math.min((now - prev) / 1000, 0.05)
      prev = now
      const st  = stateRef.current
      if (!st || !svg) return

      st.t += dt

      // Burst decay — after a hover-change the burst energy fades over ~1.4s
      burstRef.current = Math.max(0, burstRef.current - dt * 0.72)
      const burstActive = burstRef.current > 0.01

      const pathEls = svg.querySelectorAll('path')

      st.strands.forEach((strand, si) => {
        // ── 1. Slow ambient noise drift ──────────────────────────────────────
        const finalPts = strand.anchors.map(([ax, ay], ai) => {
          const nx = vnoise(strand.noisePhaseX + ai * 1.7 + st.t * strand.noiseSpeedX) * strand.noiseAmpX
          const ny = vnoise(strand.noisePhaseY + ai * 1.2 + st.t * strand.noiseSpeedY) * strand.noiseAmpY

          // ── 2. Burst displacement (spring back toward zero) ──────────────
          const ba  = strand.burstAnchors[ai]
          const bv  = strand.burstVel[ai]

          if (burstActive) {
            // Use a looser spring so it overshoots slightly then settles (organic feel)
            springTick(ba, bv, [0, 0], dt, 28, 7)
          } else if (ba[0] !== 0 || ba[1] !== 0) {
            // Tight spring back to rest when burst is over
            springTick(ba, bv, [0, 0], dt, 80, 16)
          }

          return [ax + nx + ba[0], ay + ny + ba[1]]
        })

        const el = pathEls[si]
        if (el) el.setAttribute('d', buildPath(finalPts))
      })
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  // Determine stroke colour from CSS var at render time
  const isDark = () => document.documentElement.classList.contains('dark')

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'block',
      }}
    >
      {Array.from({ length: STRAND_COUNT }, (_, i) => {
        const rand = makeRand(i * 7919 + 1234)
        rand(); rand(); rand(); rand()  // skip anchor generation calls
        rand(); rand(); rand(); rand()
        rand(); rand(); rand(); rand()
        rand(); rand(); rand(); rand()
        rand(); rand(); rand(); rand()
        rand(); rand(); rand(); rand()
        // Pull consistent per-strand visual props
        const sw  = 0.8 + (i % 7) * 0.18
        const op  = 0.15 + (i % 5) * 0.06
        return (
          <path
            key={i}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={sw.toFixed(2)}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={op.toFixed(2)}
          />
        )
      })}
    </svg>
  )
})

export default NavFluid
