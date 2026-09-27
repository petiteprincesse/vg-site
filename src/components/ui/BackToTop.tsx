'use client';

import { useLenis } from 'lenis/react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';
import { ArrowUpIcon } from './icons';
import styles from './BackToTop.module.css';

export function BackToTop() {
  const visible = useScrolled(600);
  const lenis = useLenis();
  const ref = useRef<HTMLButtonElement>(null);
  const [lift, setLift] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const button = ref.current;
      const obstacle = document.querySelector('[data-back-to-top-avoid]');
      if (!button || !obstacle) return;
      const bottom = parseFloat(getComputedStyle(button).bottom) || 0;
      const top = obstacle.getBoundingClientRect().top;
      setLift(Math.max(0, Math.round(window.innerHeight - bottom - top + 16)));
    };

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      ref={ref}
      type="button"
      style={{ '--lift': `${lift}px` } as CSSProperties}
      className={cn(styles.button, visible && styles.visible)}
      onClick={toTop}
      aria-label="Наверх"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUpIcon />
    </button>
  );
}
