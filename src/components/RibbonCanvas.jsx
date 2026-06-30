import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/*
  Three wireframe topographic ribbons — left, centre, right.
  Each ribbon is a TubeGeometry sliced into dense parallel cross-section rings (50-70 lines).
  Mouse ripple: sine wave injected at nearest tube point, travels ~30% of length then decays.
  Scroll: all three ribbons rotate and the camera drifts down.
  Theme: listens for .dark on <html>, updates line colours live.
*/

const LIGHT_STROKE  = new THREE.Color(0xC2410C)  // terracotta
const LIGHT_SHIMMER = new THREE.Color(0xfff8f0)  // near-white warm
const DARK_STROKE   = new THREE.Color(0xF5A623)  // amber
const DARK_SHIMMER  = new THREE.Color(0xffffff)  // white shimmer

function isDark() {
  return document.documentElement.classList.contains('dark')
}

function buildRibbon(scene, curve, tubeRadius, ringCount, shimmerEvery, xOffset) {
  const group = new THREE.Group()
  group.position.x = xOffset
  scene.add(group)

  const allLines = []

  for (let i = 0; i <= ringCount; i++) {
    const t = i / ringCount
    const center = curve.getPoint(t)
    const tangent = curve.getTangent(t).normalize()

    // Build a ring of points around the tube center
    const N = 32   // segments per ring circle
    const positions = []
    const up = new THREE.Vector3(0, 1, 0)
    const normal = new THREE.Vector3().crossVectors(tangent, up).normalize()
    if (normal.lengthSq() < 0.001) normal.set(1, 0, 0)
    const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize()

    for (let j = 0; j <= N; j++) {
      const angle = (j / N) * Math.PI * 2
      const px = center.x + tubeRadius * (Math.cos(angle) * normal.x + Math.sin(angle) * binormal.x)
      const py = center.y + tubeRadius * (Math.cos(angle) * normal.y + Math.sin(angle) * binormal.y)
      const pz = center.z + tubeRadius * (Math.cos(angle) * normal.z + Math.sin(angle) * binormal.z)
      positions.push(px, py, pz)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

    const isShimmer = (i % shimmerEvery === 0)
    const mat = new THREE.LineBasicMaterial({
      color: isDark()
        ? (isShimmer ? DARK_SHIMMER  : DARK_STROKE)
        : (isShimmer ? LIGHT_SHIMMER : LIGHT_STROKE),
      transparent: true,
      opacity: isShimmer ? 0.18 : 0.22,
    })

    const line = new THREE.LineLoop(geo, mat)
    group.add(line)
    allLines.push({ line, mat, isShimmer, basePositions: [...positions], t, center: center.clone() })
  }

  return { group, allLines }
}

export default function RibbonCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(innerWidth, innerHeight)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 200)
    camera.position.set(0, 0, 9)

    // ── Ribbon paths ───────────────────────────────────────────────
    // Centre ribbon — largest, most detailed, runs full page height
    const centreCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3( 0,   7,    0.0),
      new THREE.Vector3( 0.4, 5,   -0.3),
      new THREE.Vector3(-0.3, 3,    0.2),
      new THREE.Vector3( 0.2, 1,   -0.2),
      new THREE.Vector3( 0,   0,    0.0),
      new THREE.Vector3(-0.3,-2,    0.3),
      new THREE.Vector3( 0.2,-4,   -0.2),
      new THREE.Vector3( 0,  -6,    0.0),
      new THREE.Vector3(-0.1,-8,    0.1),
    ])

    // Left ribbon — enters from far left edge, sweeps inward with dramatic S-curve
    const leftCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.2, 7,    0.4),   // starts wide-left at top
      new THREE.Vector3( 0.3, 5.2, -0.2),   // swoops inward
      new THREE.Vector3(-0.8, 3.4,  0.5),   // swings back out
      new THREE.Vector3( 0.4, 1.6,  0.0),   // crosses toward center
      new THREE.Vector3(-0.6,-0.2,  0.3),   // back out
      new THREE.Vector3( 0.2,-2.4, -0.2),   // sweeps in again
      new THREE.Vector3(-0.7,-4.5,  0.4),   // out
      new THREE.Vector3( 0.1,-6.5,  0.0),   // gentle finish
      new THREE.Vector3(-0.3,-8,    0.2),
    ])

    // Right ribbon — mirror sweep, independent phase
    const rightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3( 1.2, 7,    0.2),   // starts wide-right at top
      new THREE.Vector3(-0.3, 5.2, -0.3),   // swoops inward
      new THREE.Vector3( 0.8, 3.4,  0.4),   // swings back out
      new THREE.Vector3(-0.4, 1.6, -0.1),   // crosses toward center
      new THREE.Vector3( 0.6,-0.2,  0.2),   // back out
      new THREE.Vector3(-0.2,-2.4, -0.3),   // sweeps in
      new THREE.Vector3( 0.7,-4.5,  0.3),   // out
      new THREE.Vector3(-0.1,-6.5,  0.0),   // gentle finish
      new THREE.Vector3( 0.3,-8,   -0.1),
    ])

    // Build ribbons — left/right pushed further apart for clear negative space
    const centreRibbon = buildRibbon(scene, centreCurve, 1.4, 68, 8,  0)
    const leftRibbon   = buildRibbon(scene, leftCurve,   0.85, 54, 9, -5.5)
    const rightRibbon  = buildRibbon(scene, rightCurve,  0.85, 54, 9,  5.5)

    const allRibbons = [centreRibbon, leftRibbon, rightRibbon]

    // ── Mouse + ripple state ───────────────────────────────────────
    const mouse = { x: 0, y: 0, ndcX: 0, ndcY: 0 }
    // ripple: { t0, origin_t, amplitude, speed, decay_halflife }
    const ripples = []

    const onMouseMove = e => {
      if (reduced) return
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.ndcX =  (e.clientX / innerWidth)  * 2 - 1
      mouse.ndcY = -(e.clientY / innerHeight) * 2 + 1

      // inject a ripple at mouse position — find nearest t on centre curve
      const ray = new THREE.Raycaster()
      ray.setFromCamera({ x: mouse.ndcX, y: mouse.ndcY }, camera)
      // approximate: cast ray to z=0 plane
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
      const hit   = new THREE.Vector3()
      ray.ray.intersectPlane(plane, hit)

      // find nearest t on centre curve by sampling
      let bestT = 0, bestDist = Infinity
      for (let k = 0; k <= 100; k++) {
        const st = k / 100
        const pt = centreCurve.getPoint(st)
        const d  = hit.distanceTo(pt)
        if (d < bestDist) { bestDist = d; bestT = st }
      }

      ripples.push({ t0: performance.now(), origin_t: bestT, amplitude: 0.18, speed: 0.0006, halflife: 0.3 })
      if (ripples.length > 6) ripples.shift()
    }

    // ── Scroll state ───────────────────────────────────────────────
    let scrollProg = 0
    const onScroll = () => {
      const total = document.body.scrollHeight - innerHeight
      scrollProg  = total > 0 ? scrollY / total : 0
    }

    // ── Theme observer ─────────────────────────────────────────────
    const themeObs = new MutationObserver(() => {
      const dark = isDark()
      allRibbons.forEach(({ allLines }) => {
        allLines.forEach(({ mat, isShimmer }) => {
          mat.color.set(dark
            ? (isShimmer ? DARK_SHIMMER  : DARK_STROKE)
            : (isShimmer ? LIGHT_SHIMMER : LIGHT_STROKE))
        })
      })
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // ── Resize ─────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(innerWidth, innerHeight)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('scroll',    onScroll,    { passive: true })
    window.addEventListener('resize',    onResize,    { passive: true })

    // ── Animate ────────────────────────────────────────────────────
    let animId
    const clock = new THREE.Clock()

    function applyRipples(allLines, curve, now) {
      allLines.forEach(({ line, t, basePositions }) => {
        const posAttr = line.geometry.attributes.position
        const N = posAttr.count
        let radialOffset = 0

        ripples.forEach(rip => {
          const age      = (now - rip.t0) / 1000   // seconds
          const traveled = age * rip.speed * 60     // how far ripple has moved along t
          const dist     = Math.abs(t - (rip.origin_t + traveled))
          const decay    = Math.exp(-age * 3.5)     // amplitude decay over time
          const spatial  = Math.exp(-dist / 0.3) * (dist < 0.3 ? 1 : 0) // 30% ribbon length
          radialOffset  += rip.amplitude * decay * spatial * Math.sin(dist * 40 - age * 8)
        })

        if (Math.abs(radialOffset) < 0.0005) return  // skip if no disturbance

        for (let j = 0; j < N; j++) {
          const angle = (j / N) * Math.PI * 2
          const bx = basePositions[j * 3]
          const by = basePositions[j * 3 + 1]
          const bz = basePositions[j * 3 + 2]
          const center = curve.getPoint(t)
          const rx = bx - center.x
          const ry = by - center.y
          const len = Math.sqrt(rx*rx + ry*ry) || 1
          posAttr.setXYZ(j, bx + (rx/len) * radialOffset, by + (ry/len) * radialOffset, bz)
        }
        posAttr.needsUpdate = true
      })
    }

    function animate() {
      animId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()
      const now     = performance.now()

      if (reduced) {
        renderer.render(scene, camera)
        return
      }

      // Gentle ambient sway on groups
      centreRibbon.group.rotation.y = Math.sin(elapsed * 0.18) * 0.03 + mouse.ndcX * 0.08
      centreRibbon.group.rotation.x = Math.sin(elapsed * 0.12) * 0.015 + mouse.ndcY * 0.04
      leftRibbon.group.rotation.y   = Math.sin(elapsed * 0.14 + 1) * 0.04 + mouse.ndcX * 0.06
      rightRibbon.group.rotation.y  = Math.sin(elapsed * 0.16 + 2) * 0.04 + mouse.ndcX * 0.06

      // Scroll: camera drifts down, ribbons drift up slightly
      camera.position.y = -scrollProg * 12
      centreRibbon.group.position.y = scrollProg * 0.5
      leftRibbon.group.position.y   = scrollProg * 0.3
      rightRibbon.group.position.y  = scrollProg * 0.3

      // Apply ripple disturbance to all ribbons
      applyRipples(centreRibbon.allLines, centreCurve, now)
      applyRipples(leftRibbon.allLines,   leftCurve,   now)
      applyRipples(rightRibbon.allLines,  rightCurve,  now)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll',    onScroll)
      window.removeEventListener('resize',    onResize)
      themeObs.disconnect()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}
