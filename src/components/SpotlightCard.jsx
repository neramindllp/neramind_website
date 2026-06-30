import { useRef, useState, useCallback } from 'react'
import RibbonOverlay from './RibbonOverlay'
import './SpotlightCard.css'

const MAX_TILT = 6

function accentColor() {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--accent').trim() || '#C2410C'
}

const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(194,65,12,0.14)',
  enableRibbon = false,   // opt-in per card
}) => {
  const divRef     = useRef(null)
  const overlayRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback(e => {
    const el   = divRef.current
    const rect = el.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const y    = e.clientY - rect.top

    el.style.setProperty('--mouse-x', `${x}px`)
    el.style.setProperty('--mouse-y', `${y}px`)
    el.style.setProperty('--spotlight-color', spotlightColor)

    const dx = (x / rect.width  - 0.5) * 2
    const dy = (y / rect.height - 0.5) * 2
    el.style.transform = `perspective(900px) rotateX(${(-dy * MAX_TILT).toFixed(2)}deg) rotateY(${(dx * MAX_TILT).toFixed(2)}deg) scale3d(1.012,1.012,1.012)`

    // forward mouse position to overlay's internal tracker
    if (enableRibbon && overlayRef.current) {
      overlayRef.current.dispatchMouseMove(e)
    }
  }, [spotlightColor, enableRibbon])

  const handleMouseEnter = useCallback(() => setHovered(true), [])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    const el = divRef.current
    el.style.transform = ''
    el.style.removeProperty('--mouse-x')
    el.style.removeProperty('--mouse-y')
  }, [])

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`card-spotlight ${className}`}
    >
      {enableRibbon && (
        <RibbonOverlay
          ref={overlayRef}
          visible={hovered}
          color={accentColor()}
          opacity={hovered ? 0.85 : 0}
        />
      )}

      <div className="card-spotlight__spotlight" aria-hidden="true" />

      <div className="card-spotlight__content">
        {children}
      </div>
    </div>
  )
}

export default SpotlightCard
