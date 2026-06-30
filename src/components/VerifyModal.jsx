import { useEffect } from 'react'
import { useUI } from '../context/UIContext'
import styles from './VerifyModal.module.css'

export default function VerifyModal() {
  const { verifyOpen, closeVerify } = useUI()

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') closeVerify() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeVerify])

  if (!verifyOpen) return null

  return (
    <div className={styles.backdrop} onClick={e => { if (e.target === e.currentTarget) closeVerify() }} role="dialog" aria-modal="true">
      <div className={styles.box}>
        <button className={styles.close} onClick={closeVerify} aria-label="Close">×</button>
        <div className="eyebrow">Received a call from us?</div>
        <h3>Verify it's genuinely Neramind</h3>
        <p>If someone has called you claiming to be from Neramind LLP, email us at <a href="mailto:hello@neramindllp.in">hello@neramindllp.in</a> with the caller's name and the number they called from. We'll confirm within 24 hours.</p>
        <p>Neramind agents will never ask for money, OTPs, or personal banking information over a call. If you've been asked for any of these, do not comply — contact us immediately.</p>
        <button className="btn btn-primary" onClick={closeVerify} style={{ marginTop: 8 }}>Got it</button>
      </div>
    </div>
  )
}
