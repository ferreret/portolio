import React, { useEffect, useRef, useState } from 'react';

interface AnimatedNumberProps {
  value: string;
  duration?: number;
  className?: string;
}

const parseValue = (value: string) => {
  const match = value.match(/^(\D*)([\d,.]+)(.*)$/);
  if (!match) return { prefix: value, number: null as number | null, suffix: '', hasCommas: false };
  const [, prefix, digits, suffix] = match;
  const hasCommas = digits.includes(',');
  const number = parseInt(digits.replace(/[,.]/g, ''), 10);
  if (Number.isNaN(number)) return { prefix: value, number: null as number | null, suffix: '', hasCommas: false };
  return { prefix, number, suffix, hasCommas };
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 1400, className }) => {
  const { prefix, number, suffix, hasCommas } = parseValue(value);
  const [display, setDisplay] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (number === null) return;
    if (prefersReducedMotion()) {
      setDisplay(number);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const start = performance.now();
          const target = number;
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setDisplay(target);
          };
          setDisplay(0);
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [number, duration]);

  if (number === null) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  const formatted = hasCommas ? display.toLocaleString('en-US') : String(display);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{formatted}{suffix}
    </span>
  );
};
