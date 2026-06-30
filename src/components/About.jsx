import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShinyText from './ShinyText'
import SpotlightCard from './SpotlightCard'
import styles from './About.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const trackRef = useRef()

  useEffect(() => {
    const track = trackRef.current
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className={styles.about}>
      <div className={styles.sticky}>
        <div className={styles.track} ref={trackRef}>

          <div className={styles.panel}>
            <div className={styles.panelInner}>
              <div className="eyebrow">About Neramind</div>
              <h2><ShinyText text="More than an agency." color="var(--text)" shineColor="var(--accent)" speed={3} delay={1.5} /><br /><ShinyText text="A dual-engine company." color="var(--text)" shineColor="var(--accent)" speed={3} delay={2} /></h2>
              <p>Neramind LLP was built to solve two problems that hold education back — students who don't know where to go, and institutions that don't have the digital infrastructure to serve them well. We decided to fix both.</p>
              <p style={{ marginTop: 16 }}>One company. Two arms. One mission: make education work better for everyone in India.</p>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={`${styles.panelInner} ${styles.wide}`}>
              <div className="eyebrow">Two Arms, One Brand</div>
              <h2><ShinyText text="What we actually do" color="var(--text)" shineColor="var(--accent)" speed={3} delay={1.5} /></h2>
              <div className={styles.arms}>
                <SpotlightCard className={styles.armCard}>
                  <div className={styles.armIcon}>🎓</div>
                  <h3>Student Guidance</h3>
                  <p>We help students navigate courses, colleges, and admission pipelines. Counselling, coordination with education partners, and follow-up support until they're where they belong.</p>
                </SpotlightCard>
                <SpotlightCard className={styles.armCard}>
                  <div className={styles.armIcon}>🛠️</div>
                  <h3>Software Solutions</h3>
                  <p>CRM, ERP, admission management systems, dashboards, and workflow automation built specifically for education businesses, consultancies, and institutions.</p>
                </SpotlightCard>
              </div>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={`${styles.panelInner} ${styles.wide}`}>
              <div className="eyebrow">Built for Education</div>
              <h2><ShinyText text="Products we're building" color="var(--text)" shineColor="var(--accent)" speed={3} delay={1.5} /></h2>
              <div className={styles.statsGrid}>
                {[
                  { label: 'Admissions', desc: 'End-to-end admission management — from lead capture to enrollment — in one platform built for consultancies and colleges.' },
                  { label: 'CRM & ERP', desc: 'Purpose-built CRM and ERP systems that replace spreadsheets and fragmented tools with one coherent workflow.' },
                  { label: 'Dashboards', desc: 'Live reporting dashboards that give institutions visibility into counsellors, pipelines, and performance — in real time.' },
                  { label: 'Automation', desc: 'Custom workflow automation that removes manual repetition so your team can focus on students, not spreadsheets.' },
                ].map(s => (
                  <SpotlightCard key={s.label} className={styles.statBlock}>
                    <div className={styles.statLabel}>{s.label}</div>
                    <p>{s.desc}</p>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
