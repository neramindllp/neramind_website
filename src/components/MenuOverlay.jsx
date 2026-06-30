import { useEffect, useRef } from 'react'
import { useUI } from '../context/UIContext'
import { useTheme } from '../context/ThemeContext'
import NavFluid from './NavFluid'
import styles from './MenuOverlay.module.css'

const LINKS = [
  { label: 'The Company',   href: '#about'    },
  { label: 'Our Work',      href: '#work'     },
  { label: 'Software Suite',href: '#products' },
  { label: 'The Method',    href: '#method'   },
  { label: 'Why Us',        href: '#trust'    },
  { label: 'FAQ',           href: '#faq'      },
  { label: 'Talk to Us',    href: '#contact'  },
]

export default function MenuOverlay() {
  const { menuOpen, closeMenu } = useUI()
  const { dark, toggle }        = useTheme()
  const fluidRef                = useRef(null)

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') closeMenu() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen, closeMenu])

  // Reset fluid to default when menu closes
  useEffect(() => {
    if (!menuOpen && fluidRef.current) fluidRef.current.setHover('default')
  }, [menuOpen])

  return (
    <div
      className={`${styles.overlay} ${menuOpen ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* ── Left panel — nav content ── */}
      <div className={styles.left}>
        <div className={styles.top}>
          <span className={styles.logo}>
            Neramind <span className={styles.logoSub}>LLP</span>
          </span>
          <button
            className={`${styles.closeBtn} ${styles.open}`}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <span /><span /><span />
          </button>
        </div>

        <nav className={styles.links} aria-label="Site sections">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              style={{ animationDelay: menuOpen ? `${0.08 + i * 0.07}s` : '0s' }}
              onMouseEnter={() => fluidRef.current?.setHover(l.href)}
              onMouseLeave={() => fluidRef.current?.setHover('default')}
            >
              <span className={styles.linkNum}>0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>

        <div className={styles.bottom}>
          <div className={styles.email}>
            Say hello —{' '}
            <a href="mailto:hello@neramindllp.in">hello@neramindllp.in</a>
          </div>
          <button className={styles.themeToggle} onClick={toggle}>
            <span>{dark ? '🌙' : '☀️'}</span>
            <span>{dark ? 'Dark mode' : 'Light mode'}</span>
          </button>
        </div>
      </div>

      {/* ── Right panel — living fluid canvas ── */}
      <div className={styles.right} aria-hidden="true">
        <NavFluid ref={fluidRef} />
      </div>
    </div>
  )
}
