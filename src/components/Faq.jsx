import { useEffect, useState, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useUI } from '../context/UIContext'
import ShinyText from './ShinyText'
import styles from './Faq.module.css'

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  { q: "Who is Neramind's student guidance service for?", a: "Students looking to explore undergraduate or postgraduate options in India — especially those unsure about which course, college, or career path fits their profile. We're particularly helpful if you've been overwhelmed by too many options or conflicting advice." },
  { q: "Is student guidance free?", a: "Initial counselling calls are free. If you choose to engage us for ongoing guidance and coordination with partner institutions, we'll be transparent about any applicable fees before we proceed. No surprises." },
  { q: "What kinds of institutions does Neramind build software for?", a: "Education consultancies, colleges, EdTech companies, and admission management firms. If your business touches students and admissions — and you're running on spreadsheets, WhatsApp groups, or disjointed tools — we build the systems that replace that." },
  { q: "How long does a software project typically take?", a: "It depends on scope. A CRM or dashboard project typically takes 6–12 weeks from scoping to launch. A full ERP implementation takes longer. We'll give you an honest timeline upfront — and we stick to it." },
  { q: "I received a call from someone claiming to be from Neramind. How do I verify it?", a: null },
  { q: "Do you work with institutions outside India?", a: "Our current focus is the Indian education sector. If you're an international institution with operations or partnerships in India, reach out — we'll have an honest conversation about fit." },
]

function useSpotlight(ref) {
  const onMove = useCallback(e => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    el.classList.add(styles.hovered)
  }, [ref])
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.classList.remove(styles.hovered)
  }, [ref])
  return { onMouseMove: onMove, onMouseLeave: onLeave }
}

function FaqItem({ f, i, open, onToggle, openVerify }) {
  const itemRef = useRef()
  const spotlight = useSpotlight(itemRef)
  const isOpen = open === i

  return (
    <div
      ref={itemRef}
      className={`${styles.item} ${isOpen ? styles.active : ''}`}
      {...spotlight}
    >
      <button className={styles.q} onClick={() => onToggle(i)}>
        {f.q}
        <span className={styles.icon}>+</span>
      </button>
      <div className={styles.a}>
        <div className={styles.aInner}>
          {i === 4 ? (
            <>
              If you've received a call and want to verify it's genuine,{' '}
              <button onClick={openVerify} className={styles.verifyLink}>click here to verify</button>.
              {' '}We take authenticity seriously. Neramind agents will never ask for OTPs or banking information.
            </>
          ) : f.a}
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const [open, setOpen] = useState(null)
  const { openVerify } = useUI()
  const sectionRef = useRef()
  const listRef = useRef()

  useEffect(() => {
    if (!listRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(listRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: listRef.current, start: 'top 95%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const toggle = i => setOpen(prev => prev === i ? null : i)

  return (
    <section id="faq" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header centered">
          <div className="eyebrow">Common Questions</div>
          <h2><ShinyText text="FAQ" color="var(--text)" shineColor="var(--accent)" speed={3} delay={1.5} /></h2>
          <p>Straight answers. No filler.</p>
        </div>
        <div ref={listRef} className={styles.list}>
          {FAQS.map((f, i) => (
            <FaqItem key={i} f={f} i={i} open={open} onToggle={toggle} openVerify={openVerify} />
          ))}
        </div>
      </div>
    </section>
  )
}
