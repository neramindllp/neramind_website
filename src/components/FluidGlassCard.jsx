import { useRef, useState, lazy, Suspense } from 'react'
import styles from './FluidGlassCard.module.css'

const LensCanvas = lazy(() => import('./LensCanvas'))

/**
 * FluidGlassCard — renders children inside a positioned wrapper,
 * then mounts the lens R3F canvas as an absolute overlay on hover.
 * The card visual (background, border, padding) lives in children,
 * not in this wrapper — so overflow:hidden doesn't clip card content.
 */
export default function FluidGlassCard({ children, className = '', style = {} }) {
  const [hovered, setHovered] = useState(false)
  const pointer = useRef({ x: 0, y: 0 })
  const wrapperRef = useRef()

  const onMouseMove = e => {
    if (!wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    pointer.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    pointer.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2
  }

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${className}`}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); pointer.current = { x: 0, y: 0 } }}
      onMouseMove={onMouseMove}
    >
      {/* Card content — z-index 1 so it sits above the canvas overlay */}
      <div className={styles.content}>
        {children}
      </div>

      {/* Lens overlay — pointer-events:none so it never blocks clicks */}
      {hovered && (
        <div className={styles.canvasOverlay} aria-hidden="true">
          <Suspense fallback={null}>
            <LensCanvas pointer={pointer} />
          </Suspense>
        </div>
      )}
    </div>
  )
}
