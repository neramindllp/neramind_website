import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Hero.module.css'

export default function Hero() {
  const svgRef  = useRef(null)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const wordInners = document.querySelectorAll(`.${styles.wordInner}`)

    if (reduced) {
      gsap.set(wordInners,        { y: 0 })
      gsap.set('#heroSub',        { opacity: 1, y: 0 })
      gsap.set('#heroButtons',    { opacity: 1, y: 0 })
      gsap.set('#heroMeta',       { opacity: 1 })
      gsap.set('#heroScrollHint', { opacity: 1 })
      if (svgRef.current)
        svgRef.current.querySelectorAll('path').forEach(p => {
          const l = p.getTotalLength()
          gsap.set(p, { strokeDasharray: l, strokeDashoffset: 0 })
        })
      return
    }

    gsap.set(wordInners,        { y: '110%' })
    gsap.set('#heroSub',        { opacity: 0, y: 18 })
    gsap.set('#heroButtons',    { opacity: 0, y: 18 })
    gsap.set('#heroMeta',       { opacity: 0 })
    gsap.set('#heroScrollHint', { opacity: 0 })

    if (svgRef.current)
      svgRef.current.querySelectorAll('path').forEach(p => {
        const l = p.getTotalLength()
        gsap.set(p, { strokeDasharray: l, strokeDashoffset: l })
      })

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    const line1 = document.querySelectorAll(`#heroLine1 .${styles.wordInner}`)
    const line2 = document.querySelectorAll(`#heroLine2 .${styles.wordInner}`)

    tl.to(line1,            { y: 0, duration: 1.1, stagger: 0.13 },              0.15)
    tl.to(line2,            { y: 0, duration: 1.1, stagger: 0.13 },              0.4)
    tl.to('#heroSub',       { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.9)
    tl.to('#heroButtons',   { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)' }, 1.15)
    tl.to('#heroMeta',      { opacity: 1, duration: 0.6 },                        1.4)
    tl.to('#heroScrollHint',{ opacity: 1, duration: 0.5 },                        1.7)

    if (svgRef.current)
      tl.to(svgRef.current.querySelectorAll('path'), {
        strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut', stagger: 0.22
      }, 1.9)
  }, [])

  return (
    <section className={styles.hero} id="hero">

      {/* ── Content ── */}
      <div className={styles.content}>

        <div className={`eyebrow ${styles.eyebrow}`} id="heroEyebrow">
          Education guidance &amp; EdTech software
        </div>

        <h1 className={styles.h1}>
          <span className={styles.headLine} id="heroLine1">
            {'We Guide.'.split(' ').map((word, wi) => (
              <span key={wi} className={styles.wordOuter}>
                <span className={styles.wordInner}>{word}</span>
                {wi === 0 && <span aria-hidden="true">&nbsp;</span>}
              </span>
            ))}
          </span>

          <span className={styles.headLineAccent} id="heroLine2">
            {'We Build.'.split(' ').map((word, wi) => (
              <span key={wi} className={styles.wordOuter}>
                <span className={styles.wordInner}>{word}</span>
                {wi === 0 && <span aria-hidden="true">&nbsp;</span>}
              </span>
            ))}
          </span>
        </h1>

        <p className={styles.sub} id="heroSub">
          Student guidance and EdTech software, built for India.
        </p>

        <div className={styles.buttons} id="heroButtons">
          <a href="#work"     className="btn btn-primary">I'm a Student</a>
          <a href="#products" className="btn btn-ghost">I'm an Institution</a>
        </div>

        <div className={styles.meta} id="heroMeta">
          <span className={styles.metaDot} />
          Neramind LLP
          <span className={styles.metaSep}>·</span>
          India
        </div>

      </div>

      {/* ── SVG connector lines — drawn in by GSAP ── */}
      <svg
        ref={svgRef}
        className={styles.connectorSvg}
        viewBox="0 0 1200 180"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M 600 0 C 580 50, 460 90, 340 130 C 240 160, 160 168, 80 180"
          stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"
        />
        <path
          d="M 600 0 C 620 55, 740 95, 860 130 C 960 158, 1060 170, 1140 180"
          stroke="var(--accent)" strokeWidth="1.0" strokeLinecap="round" opacity="0.28"
        />
        <path
          d="M 600 0 C 600 60, 600 110, 600 180"
          stroke="var(--accent)" strokeWidth="0.7" strokeLinecap="round" opacity="0.18"
        />
      </svg>

      {/* ── Scroll hint ── */}
      <div className={styles.scrollHint} id="heroScrollHint" aria-hidden="true">
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine} />
      </div>

    </section>
  )
}
