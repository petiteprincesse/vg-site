'use client';

import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ElementType } from 'react';
import { cn } from '@/lib/cn';
import styles from './Typewriter.module.css';

export type TypewriterPart = {
  readonly text: string;
  readonly className?: string;
};

type TypewriterProps = {
  parts: readonly TypewriterPart[];
  as?: 'p' | 'div' | 'span';
  className?: string;
  speed?: number;
  maxDuration?: number;
  delay?: number;
  hideUntilTyped?: boolean;
};

const TRAIL = 4;

export function Typewriter({
  parts,
  as = 'p',
  className,
  speed = 0.018,
  maxDuration = 2.4,
  delay = 0.1,
  hideUntilTyped = false,
}: TypewriterProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const total = useMemo(() => parts.reduce((sum, part) => sum + part.text.length, 0), [parts]);
  const [count, setCount] = useState(hideUntilTyped ? 0 : total);
  const [phase, setPhase] = useState<'pending' | 'armed' | 'done'>(hideUntilTyped ? 'armed' : 'pending');
  const done = phase === 'done';

  useLayoutEffect(() => {
    if (phase !== 'pending') return;
    const top = ref.current?.getBoundingClientRect().top ?? 0;
    if (!reduce && top > window.innerHeight) {
      setCount(0);
      setPhase('armed');
    } else {
      setPhase('done');
    }
  }, [phase, reduce]);

  useEffect(() => {
    if (!inView || phase !== 'armed') return;
    if (reduce) {
      setCount(total);
      setPhase('done');
      return;
    }
    const controls = animate(0, total, {
      duration: Math.min(total * speed, maxDuration),
      delay,
      ease: 'linear',
      onUpdate: (value) => setCount(Math.floor(value)),
      onComplete: () => {
        setCount(total);
        setPhase('done');
      },
    });
    return () => controls.stop();
  }, [inView, phase, reduce, total, speed, maxDuration, delay]);

  const Component = as as ElementType;
  let offset = 0;

  return (
    <Component ref={ref} className={cn(styles.root, className)} data-typing={!done || undefined}>
      {parts.map((part, index) => {
        const start = offset;
        offset += part.text.length;
        const typed = Math.max(0, Math.min(part.text.length, count - start));
        const settled = done ? typed : Math.max(0, Math.min(typed, count - TRAIL - start));
        const caretHere = !done && inView && count >= start && (count < offset || index === parts.length - 1);

        return (
          <span key={index} className={part.className}>
            {part.text.slice(0, settled)}
            {typed > settled ? <span className={styles.trail}>{part.text.slice(settled, typed)}</span> : null}
            {caretHere ? <span className={styles.caret} aria-hidden /> : null}
            {typed < part.text.length ? (
              <span className={phase === 'armed' && hideUntilTyped && !inView ? styles.pendingJs : styles.pending}>
                {part.text.slice(typed)}
              </span>
            ) : null}
            {index < parts.length - 1 ? ' ' : null}
          </span>
        );
      })}
    </Component>
  );
}
