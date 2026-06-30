import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShinyText from './ShinyText'
import SpotlightCard from './SpotlightCard'
import styles from './Method.module.css'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    title: 'Listen before we speak',
    body: "We start every engagement by understanding the actual problem — not the assumed one. For students that means goals, background, and constraints. For institutions it means mapping existing workflows before touching any code.",
    icon: '👂',
  },
  {
    num: '02',
    title: 'Build a clear plan',
    body: "We produce a scoped, honest proposal — what's in, what's out, how long it takes, what it costs. No vague promises. You know exactly what you're getting before work begins.",
    icon: '📐',
  },
  {
    num: '03',
    title: 'Deliver in sprints',
    body: "Software is built in visible sprints so you can see progress, give feedback, and course-correct early — not find out something's wrong six months later at launch.",
    icon: '⚡',
  },
  {
    num: '04',
    title: 'Stay accountable after delivery',
    body: "We don't hand over a password and disappear. We stay in the loop post-launch — for student guidance that means follow-up until placement; for software it means support, training, and iteration.",
    icon: '🔁',
  },
]

const STACK_OFFSET = 20   // px down per stacked card
const SCALE_STEP   = 0.03 // each buried card shrinks by this per level

export default function Method() {
  const sectionRef = useRef()
  const cardsRef   = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const cards   = cardsRef.current.filter(Boolean)
    if (!section || !cards.length) return

    // Set initial state: all cards hidden below
    gsap.set(cards, { y: '80vh', opacity: 0, scale: 1 })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=380%',
          pin: true,
          scrub: 1.6,
          anticipatePin: 1,
        },
      })

      cards.forEach((card, i) => {
        // Phase 1: fly this card up from below into centre position
        tl.fromTo(
          card,
          { y: '80vh', opacity: 0, scale: 1 },
          { y: STACK_OFFSET * i, opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out' },
          i === 0 ? 0 : '>-0.05'
        )

        // Phase 2: once the NEXT card arrives, push this one back with scale only
        // NO filter/brightness — that caused the dark flash
        if (i < cards.length - 1) {
          const buriedScale = 1 - (cards.length - 1 - i) * SCALE_STEP
          tl.to(
            card,
            { scale: buriedScale, duration: 0.5, ease: 'power2.inOut' },
            '>'
          )
        }
      })

      // Hold at the end so user sees all 4 stacked
      tl.to({}, { duration: 0.25 })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="method" ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <div className="container">
          <div className="section-header centered">
            <div className="eyebrow">How We Work</div>
            <h2>
              <ShinyText text="The Method" color="var(--text)" shineColor="var(--accent)" speed={3} delay={1.5} />
            </h2>
            <p>We move fast, stay direct, and don't disappear after delivery.</p>
          </div>
        </div>
      </div>

      <div className={styles.cardArea}>
        {STEPS.map((s, i) => (
          <div
            key={s.num}
            className={styles.cardWrap}
            ref={el => { cardsRef.current[i] = el }}
            style={{ zIndex: i + 1 }}
          >
            <SpotlightCard className={styles.card}>
              <div className={styles.stepMeta}>
                <span className={styles.num}>{s.num}</span>
                <span className={styles.icon}>{s.icon}</span>
              </div>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
            </SpotlightCard>
          </div>
        ))}
      </div>
    </section>
  )
}
