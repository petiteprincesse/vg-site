'use client';

import { useLenis } from 'lenis/react';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';
import { ArrowUpIcon } from './icons';
import styles from './BackToTop.module.css';

export function BackToTop() {
  const visible = useScrolled(600);
  const lenis = useLenis();

  const toTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={cn(styles.button, visible && styles.visible)}
      onClick={toTop}
      aria-label="Наверх"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUpIcon />
    </button>
  );
}
