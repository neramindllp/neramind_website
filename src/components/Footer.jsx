import { useUI } from '../context/UIContext'
import styles from './Footer.module.css'

export default function Footer() {
  const { openVerify } = useUI()
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <span>© 2025 Neramind LLP</span>
          <div className={styles.divider} aria-hidden="true" />
          <div className={styles.links}>
            <a href="#contact">Contact</a>
            <button onClick={openVerify} className={styles.verifyBtn}>Received a call?</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
