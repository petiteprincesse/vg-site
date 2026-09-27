'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import styles from './ScrollProgress.module.css';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <motion.div className={styles.bar} style={{ scaleX }} aria-hidden />;
}
