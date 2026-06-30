import { useEffect, useState } from 'react'
import { useUI } from '../context/UIContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { menuOpen, openMenu, closeMenu } = useUI()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleHamburger = () => menuOpen ? closeMenu() : openMenu()

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <div className={styles.inner}>
          <a href="#hero" className={styles.brand} aria-label="Neramind LLP home">
            <span className={styles.brandName}>Neramind</span>
            <span className={styles.brandSub}>LLP</span>
          </a>
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={handleHamburger}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}
