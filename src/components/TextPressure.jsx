// Ported from https://codepen.io/JuanFuentes/full/rgXKGQ
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance, maxDist, minVal, maxVal) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const TextPressure = ({
  text = 'Hello!',
  fontFamily = 'Roboto Flex',
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#1A0A00',
  strokeColor = '#C2410C',
  className = '',
  minFontSize = 36,
}) => {
  const containerRef = useRef(null);
  const titleRef     = useRef(null);
  const spansRef     = useRef([]);
  const mouseRef     = useRef({ x: 0, y: 0 });
  const cursorRef    = useRef({ x: 0, y: 0 });

  const [fontSize,    setFontSize]    = useState(minFontSize);
  const [scaleY,      setScaleY]      = useState(1);
  const [lineHeight,  setLineHeight]  = useState(1);

  const chars = text.split('');

  // track cursor / touch
  useEffect(() => {
    const onMove  = e => { cursorRef.current.x = e.clientX; cursorRef.current.y = e.clientY; };
    const onTouch = e => { cursorRef.current.x = e.touches[0].clientX; cursorRef.current.y = e.touches[0].clientY; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });

    if (containerRef.current) {
      const { left, top, width: w, height: h } = containerRef.current.getBoundingClientRect();
      mouseRef.current  = { x: left + w / 2, y: top + h / 2 };
      cursorRef.current = { ...mouseRef.current };
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  // font sizing
  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;
    const { width: cW, height: cH } = containerRef.current.getBoundingClientRect();
    let fs = cW / (chars.length / 2);
    fs = Math.max(fs, minFontSize);
    setFontSize(fs);
    setScaleY(1);
    setLineHeight(1);
    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      if (scale) {
        const tH = titleRef.current.getBoundingClientRect().height;
        if (tH > 0) { const r = cH / tH; setScaleY(r); setLineHeight(r); }
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const fn = debounce(setSize, 100);
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, [setSize]);

  // animation loop
  useEffect(() => {
    let rafId;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;
      if (titleRef.current) {
        const { width: tW } = titleRef.current.getBoundingClientRect();
        const maxDist = tW / 2;
        spansRef.current.forEach(span => {
          if (!span) return;
          const r = span.getBoundingClientRect();
          const d = dist(mouseRef.current, { x: r.x + r.width / 2, y: r.y + r.height / 2 });
          const wdth     = width  ? Math.floor(getAttr(d, maxDist, 5,   200)) : 100;
          const wght     = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
          const italVal  = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : 0;
          const alphaVal = alpha  ? getAttr(d, maxDist, 0, 1).toFixed(2) : 1;
          const fvs = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
          if (span.style.fontVariationSettings !== fvs) span.style.fontVariationSettings = fvs;
          if (alpha) span.style.opacity = alphaVal;
        });
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  const styleEl = useMemo(() => (
    <style>{`
      @import url('${fontUrl}');
      .tp-flex { display: flex; justify-content: center; }
      .tp-stroke span { position: relative; color: ${textColor}; }
      .tp-stroke span::after {
        content: attr(data-char);
        position: absolute; left: 0; top: 0;
        color: transparent; z-index: -1;
        -webkit-text-stroke-width: 3px;
        -webkit-text-stroke-color: ${strokeColor};
      }
      .tp-title { color: ${textColor}; }
    `}</style>
  ), [fontUrl, textColor, strokeColor]);

  const dynClass = [
    'tp-title',
    className,
    flex   ? 'tp-flex'   : '',
    stroke ? 'tp-stroke' : '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', background: 'transparent' }}>
      {styleEl}
      <h1
        ref={titleRef}
        className={dynClass}
        style={{
          fontFamily,
          textTransform: 'uppercase',
          fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 100,
          width: '100%',
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => (spansRef.current[i] = el)}
            data-char={char}
            style={{ display: 'inline-block', color: stroke ? undefined : textColor }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
