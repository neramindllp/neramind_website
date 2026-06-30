import { useEffect } from 'react'

const MAX_TILT = 7

export function useCardEffects() {
  useEffect(() => {
    if (!document.getElementById('card-effects-styles')) {
      const style = document.createElement('style')
      style.id = 'card-effects-styles'
      style.textContent = `
        @keyframes glowRotate {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        [data-card-glow] {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        /* idle: rotating gradient border */
        [data-card-glow]::before {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: inherit;
          z-index: 0;
          background: linear-gradient(135deg, var(--accent) 0%, transparent 35%, transparent 65%, var(--accent) 100%);
          background-size: 400% 400%;
          animation: glowRotate 4s linear infinite;
          opacity: 0.4;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        /* mouse-tracked spotlight — always present but 0 opacity until hover */
        [data-card-glow]::after {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: inherit;
          z-index: 0;
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), var(--accent) 0%, transparent 65%);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        /* on hover: hide rotating border, show spotlight */
        [data-card-glow].card-hovered::before { opacity: 0; }
        [data-card-glow].card-hovered::after  { opacity: 0.45; }

        /* ensure children render above pseudo-elements */
        [data-card-glow] > * { position: relative; z-index: 1; }
      `
      document.head.appendChild(style)
    }

    const attached = new WeakSet()

    function bind(el) {
      if (attached.has(el)) return
      attached.add(el)

      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect()
        const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
        const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
        el.style.transform = `perspective(800px) rotateX(${(-dy * MAX_TILT).toFixed(2)}deg) rotateY(${(dx * MAX_TILT).toFixed(2)}deg) scale3d(1.015,1.015,1.015)`
        el.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%')
        el.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%')
        el.classList.add('card-hovered')
      })

      el.addEventListener('mouseleave', () => {
        el.style.transform = ''
        el.style.removeProperty('--mx')
        el.style.removeProperty('--my')
        el.classList.remove('card-hovered')
      })
    }

    function scanAndBind() {
      document.querySelectorAll('[data-card-glow]').forEach(bind)
    }

    scanAndBind()

    const observer = new MutationObserver(scanAndBind)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])
}
