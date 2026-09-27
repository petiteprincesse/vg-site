'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { EASE_OUT } from '@/components/motion/Reveal';
import styles from './Hero.module.css';

type HeroMediaProps = {
  src: string;
  alt: string;
};

export function HeroMedia({ src, alt }: HeroMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.35]);

  return (
    <div ref={ref} className={styles.photo}>
      <motion.div className={styles.photoParallax} style={{ y }}>
        <motion.div
          className={styles.photoZoom}
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ scale: { duration: 2.2, ease: EASE_OUT }, opacity: { duration: 0.8 } }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            quality={90}
            sizes="100vw"
            className={styles.photoImage}
          />
        </motion.div>
      </motion.div>
      <motion.div className={styles.photoShade} style={{ opacity: dim }} aria-hidden />
    </div>
  );
}
