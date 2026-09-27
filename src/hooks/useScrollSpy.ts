'use client';

import { useEffect, useState } from 'react';

export function useScrollSpy(ids: readonly string[], offset = 96): string | undefined {
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }

        const next = elements.find((el) => visible.has(el.id));
        setActiveId(next?.id);
      },
      {
        rootMargin: `-${offset}px 0px -60% 0px`,
        threshold: [0, 0.01, 0.25],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}
