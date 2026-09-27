'use client';

import { useEffect } from 'react';

export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.dataset.scrollLocked = 'true';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      delete body.dataset.scrollLocked;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [locked]);
}
