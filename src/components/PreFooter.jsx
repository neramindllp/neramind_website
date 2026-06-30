import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShinyText from './ShinyText'
import styles from './PreFooter.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function PreFooter() {
  useEffect(() => {
    gsap.from('#prefooterCta', { opacity: 0, y: 40, duration: 0.7, scrollTrigger: { trigger: '#prefooterCta', start: 'top 85%' } })
  }, [])

  return (
    <div id="prefooterCta" className={styles.prefooter}>
      <div className="container">
        <h2><ShinyText text="Ready to move forward?" color="#fff" shineColor="#FDE68A" speed={3} delay={2} /></h2>
        <p>A conversation costs nothing. The right next step might change everything.</p>
        <div className={styles.buttons}>
          <a href="#contact" className="btn btn-white">Talk to Us</a>
          <a href="mailto:hello@neramindllp.in" className="btn btn-white-ghost">hello@neramindllp.in</a>
        </div>
      </div>
    </div>
  )
}
