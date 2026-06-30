import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShinyText from './ShinyText'
import SpotlightCard from './SpotlightCard'
import styles from './Work.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Work() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('#workPath', {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: '#work', start: 'top 70%', end: 'center 40%', scrub: true }
      })
      gsap.fromTo('#workStudent',
        { opacity: 0, x: -32 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: '#work', start: 'top 90%', once: true } }
      )
      gsap.fromTo('#workSoftware',
        { opacity: 0, x: 32 },
        { opacity: 1, x: 0, duration: 0.9, delay: 0.15, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: '#work', start: 'top 90%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">What We Do</div>
          <h2><ShinyText text="Two services." color="var(--text)" shineColor="var(--accent)" speed={3} delay={1.5} /><br /><ShinyText text="One company." color="var(--text)" shineColor="var(--accent)" speed={3} delay={2} /></h2>
          <p>Whether you're a student figuring out your next step or an institution figuring out your next system — Neramind has a seat at the table for you.</p>
        </div>

        <div className={styles.grid}>
          <div id="workStudent">
            <SpotlightCard className={styles.block} enableRibbon>
              <div className="eyebrow">For Students</div>
              <h3><ShinyText text="Student Guidance" color="var(--text)" shineColor="var(--accent)" speed={4} delay={2} /></h3>
              <p>We sit across the table from students and help them think through courses, colleges, eligibility, and timing. Then we coordinate with our education partners to open the right doors.</p>
              <ul className={styles.features}>
                <li>One-on-one counselling sessions</li>
                <li>Course and college shortlisting</li>
                <li>Admission coordination with partner institutions</li>
                <li>Follow-up support through the process</li>
                <li>Transparent, no-pressure guidance</li>
              </ul>
              <a href="#contact" className="btn btn-primary" style={{ marginTop: 24 }}>Talk to a Counsellor</a>
            </SpotlightCard>
          </div>

          <div className={styles.connector} aria-hidden="true">
            <svg className={styles.svg} width="80" height="240" viewBox="0 0 80 240" fill="none">
              <path id="workPath"
                d="M 40 0 C 40 60, 10 90, 10 120 C 10 150, 70 180, 70 210 L 40 240"
                stroke="var(--accent)" strokeWidth="2"
                strokeDasharray="320" strokeDashoffset="320"
                fill="none" strokeLinecap="round"
              />
            </svg>
          </div>

          <div id="workSoftware">
            <SpotlightCard className={styles.block} enableRibbon>
              <div className="eyebrow">For Institutions</div>
              <h3><ShinyText text="Software Solutions" color="var(--text)" shineColor="var(--accent)" speed={4} delay={2.5} /></h3>
              <p>We build the digital infrastructure that modern education businesses need — from CRM to full ERP, custom dashboards to workflow automation. No off-the-shelf compromise.</p>
              <ul className={styles.features}>
                <li>Admission management systems</li>
                <li>CRM and ERP for consultancies and colleges</li>
                <li>Live reporting dashboards</li>
                <li>Workflow automation and integrations</li>
                <li>Custom digital tools from the ground up</li>
              </ul>
              <a href="#contact" className="btn btn-ghost" style={{ marginTop: 24 }}>Request a Demo</a>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  )
}
