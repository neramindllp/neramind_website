import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SpotlightCard from './SpotlightCard'
import ShinyText from './ShinyText'
import styles from './Trust.module.css'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { icon: '🤝', title: 'No hidden fees', desc: "We quote what it costs and build what we quoted. No scope creep that wasn't agreed upfront." },
  { icon: '📞', title: 'Always reachable', desc: "One point of contact for every engagement. You'll always know who to call and they'll actually pick up." },
  { icon: '🛡️', title: 'Verified & legitimate', desc: "We're a registered LLP operating transparently. If you receive a call from us, you can verify it — always." },
  { icon: '🎯', title: 'Education only', desc: "We don't serve every industry. We know education deeply and that specialisation shows in everything we build." },
  { icon: '⚡', title: 'Fast, direct communication', desc: "We reply within 1 business day. Decisions get made quickly because we don't have layers of approval." },
  { icon: '🔄', title: 'Built to iterate', desc: "Software isn't done at launch. We build for change — features evolve, and we build that expectation into every engagement." },
]

const STATS = [
  { num: 'B2C', label: 'Student guidance — direct, personal counselling' },
  { num: 'B2B', label: 'Software for education businesses and institutions' },
  { num: 'India', label: 'Purpose-built for the Indian education sector' },
]

export default function Trust() {
  const sectionRef = useRef()
  const statsRef = useRef()
  const featuresRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(statsRef.current.children,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.13, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: statsRef.current, start: 'top 95%', once: true } }
      )
      gsap.fromTo(featuresRef.current.children,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: featuresRef.current, start: 'top 95%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="trust" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header centered">
          <div className="eyebrow">Commitment &amp; Trust</div>
          <h2><ShinyText text="Why Us" color="var(--text)" shineColor="var(--accent)" speed={3} delay={1.5} /></h2>
          <p>We're building the kind of company we'd want to work with ourselves.</p>
        </div>

        <div className={styles.stats} ref={statsRef}>
          {STATS.map(s => (
            <div key={s.num} className={styles.stat}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.features} ref={featuresRef}>
          {FEATURES.map(f => (
            <SpotlightCard key={f.title} className={styles.feature}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
