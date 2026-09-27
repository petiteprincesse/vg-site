'use client';

import { MotionConfig } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';
import 'lenis/dist/lenis.css';

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          anchors: true,
          stopInertiaOnNavigate: true,
        }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
