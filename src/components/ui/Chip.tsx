'use client';

import { motion } from 'motion/react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import styles from './Chip.module.css';

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  pillId?: string;
};

export function Chip({ active = false, pillId, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      className={cn(styles.chip, active && styles.active, pillId && styles.withPill, className)}
      aria-pressed={active}
      data-active={active || undefined}
      {...rest}
    >
      {pillId && active ? (
        <motion.span
          layoutId={pillId}
          className={styles.pill}
          transition={{ type: 'spring', stiffness: 460, damping: 38 }}
          aria-hidden
        />
      ) : null}
      <span className={styles.label}>{children}</span>
    </button>
  );
}
