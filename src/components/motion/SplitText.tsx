'use client';

import { motion, stagger } from 'motion/react';
import { Fragment, type ElementType } from 'react';
import { cn } from '@/lib/cn';
import { EASE_OUT } from './Reveal';
import styles from './SplitText.module.css';

type SplitTextProps = {
  lines: readonly string[];
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  id?: string;
  className?: string;
  lineClassName?: string;
  by?: 'word' | 'char';
  delay?: number;
  immediate?: boolean;
};

export function SplitText({
  lines,
  as = 'h2',
  id,
  className,
  lineClassName,
  by = 'word',
  delay = 0,
  immediate = false,
}: SplitTextProps) {
  const Component = motion[as] as ElementType;
  const interval = by === 'char' ? 0.035 : 0.07;
  const trigger = immediate
    ? { initial: 'hidden', animate: 'visible' }
    : { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.6 } };

  return (
    <Component
      id={id}
      className={cn(styles.root, className)}
      aria-label={lines.join(' ')}
      variants={{ hidden: {}, visible: { transition: { delayChildren: stagger(interval, { startDelay: delay }) } } }}
      {...trigger}
    >
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {lineIndex > 0 ? ' ' : null}
          <span className={cn(styles.line, lineClassName)} aria-hidden>
            {line.split(' ').map((word, wordIndex, words) => (
              <Fragment key={wordIndex}>
                <span className={styles.word}>
                  {by === 'char' ? (
                    Array.from(word).map((char, charIndex) => (
                      <span key={charIndex} className={styles.mask}>
                        <motion.span className={styles.glyph} variants={glyphVariants}>
                          {char}
                        </motion.span>
                      </span>
                    ))
                  ) : (
                    <span className={styles.mask}>
                      <motion.span className={styles.glyph} variants={glyphVariants}>
                        {word}
                      </motion.span>
                    </span>
                  )}
                </span>
                {wordIndex < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </span>
        </Fragment>
      ))}
    </Component>
  );
}

const glyphVariants = {
  hidden: { y: '105%', rotate: 4 },
  visible: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};
