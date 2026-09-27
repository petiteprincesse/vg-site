'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { EASE_OUT } from './Reveal';
import styles from './ImageReveal.module.css';

type ImageRevealProps = {
  className?: string;
  children: ReactNode;
  delay?: number;
  from?: 'bottom' | 'left' | 'right';
};

const CLOSED = {
  bottom: 'inset(100% 0% 0% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
} as const;

export function ImageReveal({ className, children, delay = 0, from = 'bottom' }: ImageRevealProps) {
  return (
    <motion.div
      className={cn(styles.frame, className)}
      inherit={false}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className={styles.curtain}
        variants={{
          hidden: { clipPath: CLOSED[from] },
          visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, delay, ease: EASE_OUT } },
        }}
      >
        <motion.div
          className={styles.zoom}
          variants={{
            hidden: { scale: 1.18 },
            visible: { scale: 1, transition: { duration: 1.5, delay, ease: EASE_OUT } },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
