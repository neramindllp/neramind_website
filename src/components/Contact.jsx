import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShinyText from './ShinyText'
import SpotlightCard from './SpotlightCard'
import styles from './Contact.module.css'

gsap.registerPlugin(ScrollTrigger)

const COURSE_OPTIONS = ['Engineering / Technology','Medicine / Healthcare','Management / MBA','Law','Arts & Humanities','Science','Commerce / Finance','Design / Architecture','Other']
const ORG_TYPES = ['College / University','Consultancy','EdTech','Other']

async function submitForm(form, setStatus, setSubmitting) {
  setSubmitting(true)
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })
    setStatus(res.ok ? 'success' : 'error')
    if (res.ok) form.reset()
  } catch { setStatus('error') }
  setSubmitting(false)
}

function StudentForm() {
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  return (
    <form action="https://formspree.io/f/xojbgwpn" method="POST" onSubmit={e => { e.preventDefault(); submitForm(e.target, setStatus, setSubmitting) }}>
      <input type="hidden" name="_type" value="student" />
      <div className={styles.formGrid}>
        <label>Name <input type="text" name="name" placeholder="Your name" required /></label>
        <label>Phone <input type="tel" name="phone" placeholder="+91 98765 43210" required /></label>
        <label style={{ gridColumn: '1/-1' }}>Course Interest
          <select name="course_interest" required>
            <option value="">Select a field</option>
            {COURSE_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </label>
        <label style={{ gridColumn: '1/-1' }}>Message (optional)
          <textarea name="message" placeholder="Tell us a bit about where you are and what you're looking for…" />
        </label>
      </div>
      <div className={styles.submit}>
        <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Sending…' : 'Send Message →'}</button>
      </div>
      {status === 'success' && <div className={styles.statusSuccess}>Message sent! We'll reply within 1 business day.</div>}
      {status === 'error' && <div className={styles.statusError}>Something went wrong. Please email us at hello@neramindllp.in</div>}
    </form>
  )
}

function InstitutionForm() {
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  return (
    <form action="https://formspree.io/f/xojbgwpn" method="POST" onSubmit={e => { e.preventDefault(); submitForm(e.target, setStatus, setSubmitting) }}>
      <input type="hidden" name="_type" value="institution" />
      <div className={styles.formGrid}>
        <label>Organisation Name <input type="text" name="org_name" placeholder="Your organisation" required /></label>
        <label>Contact Name <input type="text" name="contact_name" placeholder="Your name" required /></label>
        <label>Email <input type="email" name="email" placeholder="you@organisation.com" required /></label>
        <label>Organisation Type
          <select name="org_type" required>
            <option value="">Select type</option>
            {ORG_TYPES.map(o => <option key={o}>{o}</option>)}
          </select>
        </label>
        <label style={{ gridColumn: '1/-1' }}>Message
          <textarea name="message" placeholder="Tell us about your current systems and what you're trying to solve…" />
        </label>
      </div>
      <div className={styles.submit}>
        <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Sending…' : 'Send Message →'}</button>
      </div>
      {status === 'success' && <div className={styles.statusSuccess}>Message sent! We'll reply within 1 business day.</div>}
      {status === 'error' && <div className={styles.statusError}>Something went wrong. Please email us at hello@neramindllp.in</div>}
    </form>
  )
}

export default function Contact() {
  const [tab, setTab] = useState('student')
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('#contactWrap',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: '#contactWrap', start: 'top 95%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header centered">
          <div className="eyebrow">Let's Begin</div>
          <h2><ShinyText text="Talk to Us" color="var(--text)" shineColor="var(--accent)" speed={3} delay={1.5} /></h2>
          <p>Whether you're a student with questions or an institution with a project — we reply within 1 business day.</p>
        </div>
        <div id="contactWrap" className={styles.wrap}>
          <div>
            <div className={styles.tabs}>
              <button className={`${styles.tab} ${tab === 'student' ? styles.tabActive : ''}`} onClick={() => setTab('student')}>I'm a Student</button>
              <button className={`${styles.tab} ${tab === 'institution' ? styles.tabActive : ''}`} onClick={() => setTab('institution')}>I'm an Institution</button>
            </div>
            {tab === 'student' ? <StudentForm /> : <InstitutionForm />}
          </div>
          <div className={styles.info}>
            {[
              { label: 'Email', content: <a href="mailto:hello@neramindllp.in">hello@neramindllp.in</a> },
              { label: 'Response time', content: 'We reply within 1 business day' },
              { label: 'Who we work with', content: "Students and institutions across India. Whether you're planning your future or building systems for others — we're here." },
              { label: 'Trust', content: "We're a registered LLP — transparent, verified, and accountable. You can always confirm who you're speaking with." },
            ].map(({ label, content }) => (
              <SpotlightCard key={label} className={styles.infoCard}>
                <div className={styles.infoLabel}>{label}</div>
                <p>{content}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
