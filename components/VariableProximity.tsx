"use client";
import {
  forwardRef, useRef, useEffect,
  MutableRefObject, CSSProperties, HTMLAttributes,
} from 'react';

/**
 * VariableProximity — NO-REFLOW version
 *
 * Instead of animating fontVariationSettings (which changes glyph metrics
 * and causes line reflow), this version animates ONLY:
 *   - opacity  (per letter, subtle brightening near cursor)
 *   - color    (interpolated from dim → bright)
 *   - filter: brightness() (no layout impact)
 *
 * Every letter span is display:inline-block; will-change:filter,color,opacity
 * so the browser composites them without touching layout.
 *
 * The paragraph width/height/line-breaks NEVER change during hover.
 */

function useMousePositionRef(containerRef: MutableRefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: -9999, y: -9999 });
  useEffect(() => {
    const update = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      }
    };
    const onMove  = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => update(e.touches[0].clientX, e.touches[0].clientY);
    const onLeave = () => { positionRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [containerRef]);
  return positionRef;
}

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromFontVariationSettings?: string; // kept for API compatibility, not used
  toFontVariationSettings?: string;   // kept for API compatibility, not used
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (props, ref) => {
    const {
      label,
      fromFontVariationSettings: _from,  // destructured out — not passed to DOM
      toFontVariationSettings: _to,       // destructured out — not passed to DOM
      containerRef,
      radius = 120,
      falloff = 'gaussian',
      className = '',
      onClick,
      style,
      ...restProps
    } = props;

    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const mouseRef   = useMousePositionRef(containerRef);
    const lastPos    = useRef({ x: -9999, y: -9999 });
    const rafId      = useRef<number>(0);

    useEffect(() => {
      const loop = () => {
        rafId.current = requestAnimationFrame(loop);

        const { x, y } = mouseRef.current;
        if (x === lastPos.current.x && y === lastPos.current.y) return;
        lastPos.current = { x, y };

        const containerEl = containerRef.current;
        if (!containerEl) return;
        const containerRect = containerEl.getBoundingClientRect();

        letterRefs.current.forEach(el => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width  / 2 - containerRect.left;
          const cy = rect.top  + rect.height / 2 - containerRect.top;
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);

          // Proximity 0..1
          let t = 0;
          if (dist < radius) {
            const norm = 1 - dist / radius;
            switch (falloff) {
              case 'exponential': t = norm ** 2; break;
              case 'gaussian':    t = Math.exp(-((dist / (radius / 2)) ** 2) / 2); break;
              default:            t = norm;
            }
          }

          // Animate ONLY filter + opacity — zero layout impact
          const brightness = 1 + t * 0.55;   // 1.0 → 1.55 near cursor
          const opacity    = 0.55 + t * 0.45; // 0.55 → 1.0 near cursor

          el.style.filter  = `brightness(${brightness})`;
          el.style.opacity = String(opacity);
        });
      };
      rafId.current = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(rafId.current);
    }, [containerRef, radius, falloff, mouseRef]);

    // Split into words then letters
    const words = label.split(' ');
    let letterIndex = 0;

    return (
      <span
        ref={ref}
        onClick={onClick}
        style={{ display: 'inline', ...style }}
        className={className}
        {...restProps}
      >
        {words.map((word, wi) => (
          <span
            key={wi}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              // Reserve the bold width so line-breaks never change
              // even if we were to animate weight (we don't, but belt+suspenders)
            }}
          >
            {word.split('').map(letter => {
              const idx = letterIndex++;
              return (
                <span
                  key={idx}
                  ref={el => { letterRefs.current[idx] = el; }}
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    // Pre-render at target opacity so no flash
                    opacity: 0.55,
                    filter: 'brightness(1)',
                    willChange: 'filter, opacity',
                    // NO font-size, font-weight, letter-spacing, width, height
                  }}
                >
                  {letter}
                </span>
              );
            })}
            {wi < words.length - 1 && (
              <span style={{ display: 'inline-block' }}>&nbsp;</span>
            )}
          </span>
        ))}
        <span className="sr-only">{label}</span>
      </span>
    );
  }
);

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
